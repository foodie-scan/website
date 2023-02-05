from boto3 import client
from dotenv import load_dotenv
from flask import Flask, render_template, request
from os import getenv

load_dotenv()
AWS_REGION = getenv("AWS_REGION")
lex_config = {
  "botAliasId": getenv("AWS_LEX_BOT_ALIAS_ID"),
  "botId": getenv("AWS_LEX_BOT_ID"),
  "localeId": getenv("AWS_LEX_LOCALE_ID"),
}

lex_runtime = client("lexv2-runtime", region_name=AWS_REGION)

app = Flask(__name__, "", "build", template_folder="build")

@app.route("/", methods=["GET"])
def home():
  return render_template("index.html")

@app.route("/api/recognize-text", methods=["POST"])
def recognizeText():
  body: dict = request.json
  kwargs = lex_config.copy()
  kwargs["sessionId"] = body["sessionId"]
  kwargs["text"] = body["text"]
  try:
    kwargs["sessionState"] = session_state = body["sessionState"]
    if session_state["intent"]["name"] == "FeedbackIntent":
      dialog_action = session_state["dialogAction"]
      if dialog_action["type"] == "ElicitSlot":
        if dialog_action["slotToElicit"] == "Feedback":
          kwargs["sessionState"]["sessionAttributes"]["Hello"] = "World"
  except KeyError:
    pass
  response = lex_runtime.recognize_text(**kwargs)
  # Return all fields from response except ResponseMetadata, interpretations, & sessionId
  return {
    k: response[k]
    for k in response
    if k not in ["ResponseMetadata", "interpretations", "sessionId"]
  }

app.run(debug=False)