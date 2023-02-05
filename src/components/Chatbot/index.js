import { useState } from "react";

import ChatbotFunctions from "./Functions";

import "./index.css";

export default function Chatbot() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="position-fixed" id="chatbot">
      {expanded ? (
        <div
          className="bg-white border border-2 border-accent card d-flex flex-column"
          id="chatbot-convo"
        >
          <header
            className="align-items-center bg-accent card-header d-flex fs-5 justify-content-between pe-4 ps-3 text-white"
            data-bs-theme="dark"
          >
            <h5 className="my-1">Feedback</h5>
            <button
              className="btn btn-close btn-close-white p-0"
              onClick={() => setExpanded(false)}
            />
          </header>
          <ChatbotFunctions />
        </div>
      ) : (
        <button
          className="align-items-center bg-accent border-0 d-flex justify-content-center rounded-pill shadow-sm"
          id="chatbot-fab"
          onClick={() => setExpanded(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="white"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
          </svg>
        </button>
      )}
    </div>
  );
}
