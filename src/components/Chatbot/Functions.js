import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import ChatbotMessage from "./Message";

const sessionId = uuidv4();

export default function ChatbotFunctions() {
  /**
   * @type {React.MutableRefObject<HTMLFormElement>}
   */
  const form_ref = useRef();
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

  const addMessage = useCallback(
    /**
     * @param {Parameters<typeof ChatbotMessage>[0]} props
     */
    function (props) {
      const messages = messages_ref.current;
      messages.push(<ChatbotMessage key={messages.length} {...props} />);
    },
    []
  );

  const sendMessage = useCallback(
    async function (text, content) {
      const res_promise = fetch("/api/recognize-text", {
        body: JSON.stringify({ sessionId, sessionState, text }),
        headers: { "Content-Type": "application/json" },
        method: "post"
      });

      addMessage({
        from_user: true,
        message: { content, contentType: "PlainText" }
      });
      forceUpdate();

      const res = await res_promise;
      const body = await res.json();
      return body;
    },
    [addMessage, forceUpdate, sessionState]
  );
  const handleBody = useCallback(
    function (body) {
      for (const message of body.messages) {
        addMessage({
          buttonsOnClick: async function (text, value) {
            handleBody(await sendMessage(value, text));
          },
          from_user: false,
          message
        });
      }
      setSessionState(body.sessionState);
    },
    [addMessage, sendMessage]
  );

  const onSubmit = useCallback(
    async function (e) {
      e.preventDefault();

      const form = form_ref.current;
      const text = new FormData(form).get("text");
      form.reset();
      handleBody(await sendMessage(text, text));
    },
    [handleBody, sendMessage]
  );

  return (
    <>
      <div className="card-body flex-grow-1 overflow-auto pt-0">
        {messages_ref.current}
      </div>
      <form
        className="card-footer px-2 py-2"
        onSubmit={onSubmit}
        ref={form_ref}
      >
        <div className="input-group">
          <input
            className="form-control"
            name="text"
            placeholder='Say "Feedback" to start'
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
