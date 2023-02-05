import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import ChatbotMessage from "./Message";
import ChatbotMessages from "./Messages";

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

  const onSubmit = useCallback(
    async function (e) {
      e.preventDefault();
      const input = input_ref.current;
      const messages = messages_ref.current;

      const text = input.value;
      messages.push(
        <ChatbotMessage message={{ content: text, contentType: "PlainText" }} />
      );
      input.value = "";

      const res = await fetch("/api/recognize-text", {
        body: JSON.stringify({ sessionId, sessionState, text }),
        headers: { "Content-Type": "application/json" },
        method: "post"
      });
      const body = await res.json();

      for (const message of body.messages) {
        messages.push(
          <ChatbotMessage key={messages.length} message={message} />
        );
      }
      setSessionState(body.sessionState);
    },
    [sessionState]
  );

  return (
    <>
      <ChatbotMessages ref={messages_ref} />
      <form
        className="bg-light px-2 py-2 rounded-0 rounded-bottom"
        onSubmit={onSubmit}
      >
        <div className="input-group">
          <input
            className="form-control"
            name="text"
            placeholder={'Say "Feedback" to start'}
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
