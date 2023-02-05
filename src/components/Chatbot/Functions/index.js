import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import ChatbotMessage from "./Message";

const sessionId = uuidv4();

export default function ChatbotFunctions() {
  /**
   * @type {React.MutableRefObject<HTMLInputElement>}
   */
  const input_ref = useRef();
  /**
   * @type {React.MutableRefObject<HTMLElement[]>}
   */
  const messages_ref = useRef([]);
  const [sessionState, setSessionState] = useState({});

  const setUpdate = useState(false)[1];
  const forceUpdate = useCallback(
    () => setUpdate((update) => !update),
    [setUpdate]
  );

  const sendMessage = useCallback(
    function (text) {
      const messages = messages_ref.current;
      messages.push(
        <ChatbotMessage message={{ content: text, contentType: "PlainText" }} />
      );
      forceUpdate();
    },
    [forceUpdate]
  );

  const recognizeText = useCallback(
    async function (text) {
      const res = await fetch("/api/recognize-text", {
        body: JSON.stringify({ sessionId, sessionState, text }),
        headers: { "Content-Type": "application/json" },
        method: "post"
      });
      const body = await res.json();
      return body;
    },
    [sessionState]
  );
  const handleBody = useCallback(function (body) {
    const messages = messages_ref.current;
    for (const message of body.messages) {
      messages.push(<ChatbotMessage key={messages.length} message={message} />);
    }
    setSessionState(body.sessionState);
  }, []);

  const onSubmit = useCallback(
    async function (e) {
      e.preventDefault();

      const input = input_ref.current;
      const text = input.value;
      const body_promise = recognizeText(text);

      sendMessage(text);
      input.value = "";

      handleBody(await body_promise);
    },
    [handleBody, recognizeText, sendMessage]
  );

  return (
    <>
      <div className="card-body flex-grow-1 pt-0">{messages_ref.current}</div>
      <form className="card-footer px-2 py-2" onSubmit={onSubmit}>
        <div className="input-group">
          <input
            className="form-control"
            name="text"
            placeholder='Say "Feedback" to start'
            ref={input_ref}
            type="text"
          />
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </div>
      </form>
    </>
  );
}
