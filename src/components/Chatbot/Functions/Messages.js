import { forwardRef } from "react";

function ChatbotMessages(_, ref) {
  return <div className="card-body flex-grow-1">{ref.current}</div>;
}

export default forwardRef(ChatbotMessages);
