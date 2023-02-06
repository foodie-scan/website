from boto3 import client
from dotenv import load_dotenv
from flask import Flask, render_template, request
from os import getenv
from sgnlp.models.sentic_gcn import (
  SenticGCNBertConfig,
  SenticGCNBertEmbeddingConfig,
  SenticGCNBertEmbeddingModel,
  SenticGCNBertModel,
  SenticGCNBertPostprocessor,
  SenticGCNBertPreprocessor,
  SenticGCNBertTokenizer
)

load_dotenv()
AWS_REGION = getenv("AWS_REGION")
lex_config = {
  "botAliasId": getenv("AWS_LEX_BOT_ALIAS_ID"),
  "botId": getenv("AWS_LEX_BOT_ID"),
  "localeId": getenv("AWS_LEX_LOCALE_ID"),
}

lex_runtime = client("lexv2-runtime", region_name=AWS_REGION)

app = Flask(__name__, "", "build", template_folder="build")


# Create tokenizer
tokenizer = SenticGCNBertTokenizer.from_pretrained("bert-base-uncased")
# Create embedding model
embed_config = SenticGCNBertEmbeddingConfig.from_pretrained("bert-base-uncased")
embed_model = SenticGCNBertEmbeddingModel.from_pretrained("bert-base-uncased", config=embed_config)
# Create preprocessor
preprocessor = SenticGCNBertPreprocessor(
  tokenizer=tokenizer,
  embedding_model=embed_model,
  senticnet="https://storage.googleapis.com/sgnlp/models/sentic_gcn/senticnet.pickle",
  device="cpu",
)
# Create postprocessor
postprocessor = SenticGCNBertPostprocessor()
config = SenticGCNBertConfig.from_pretrained(
  "https://storage.googleapis.com/sgnlp/models/sentic_gcn/senticgcn_bert/config.json"
)

model = SenticGCNBertModel.from_pretrained(
  "https://storage.googleapis.com/sgnlp/models/sentic_gcn/senticgcn_bert/pytorch_model.bin", 
  config=config
)
def analyzeFeedback(aspect: str, feedback: str):
  inputs = [{
    "aspects": [aspect],
    "sentence": f"{aspect}: {feedback}"
  }]
  
  processed_inputs, processed_indices = preprocessor(inputs)
  outputs = model(processed_indices)

  # Postprocessing
  # sample output
  # [{'sentence': ['The', 'food', 'was', 'too', 'jialat'],
  #   'aspects': [[1]], 
  #   'labels': [-1]}]
  post_outputs = postprocessor(processed_inputs=processed_inputs, model_outputs=outputs)
  score = post_outputs[0]["labels"][0]
  return score

@app.route("/", methods=["GET"])
def home():
  return render_template("index.html")

@app.route("/api/recognize-text", methods=["POST"])
def recognizeText():
  body: dict = request.json
  kwargs = lex_config.copy()
  kwargs["sessionId"] = body["sessionId"]
  kwargs["text"] = text = body["text"]
  try:
    kwargs["sessionState"] = session_state = body["sessionState"]
    intent = session_state["intent"]
    dialog_action = session_state["dialogAction"]
    del kwargs["sessionState"]["dialogAction"]
    del kwargs["sessionState"]["intent"]

    if intent["name"] == "FeedbackIntent":
      if dialog_action["type"] == "ElicitSlot" and dialog_action["slotToElicit"] == "Feedback":
        aspect = intent["slots"]["Aspect"]["value"]["interpretedValue"]
        sentiment = analyzeFeedback(aspect, text)
        positive_prefix = "Thank you for your feedback!"
        if aspect == "Bugs":
          if sentiment == 1:
            message = positive_prefix
          else:
            message = f"We apologize for the Bugs you faced. Our team will work to resolve your issue."
        else:
          postfix = "We will continue to improve our service to better serve you."
          if sentiment == -1:
            message = f"We are sorry that our service did not meet your expectations. {postfix}"
          else:
            message = f"{positive_prefix} {postfix}"
        kwargs["sessionState"]["sessionAttributes"]["FulfillmentResponse"] =  message
  except KeyError:
    pass
  lex_response = lex_runtime.recognize_text(**kwargs)

  response = lex_response.copy()
  del response["ResponseMetadata"]
  del response["interpretations"]
  del response["sessionId"]
  del response["sessionState"]["originatingRequestId"]
  return response

app.run(debug=False)