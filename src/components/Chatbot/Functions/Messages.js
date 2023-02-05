import { forwardRef } from "react";

function ChatbotMessages(_, ref) {
  return <div className="flex-grow-1">{ref.current}</div>;
}

export default forwardRef(ChatbotMessages);
