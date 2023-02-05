/**
 * @param {{
 *  message: {
 *    content: string,
 *    contentType: "PlainText"
 *  } | {
 *    contentType: "ImageResponseCard",
 *    imageResponseCard?: {
 *      buttons?: {
 *        text: string,
 *        value: string
 *      }[],
 *      subtitle?: string,
 *      title: string
 *    }
 *  }
 * }} props
 */
export default function ChatbotMessage({ message }) {
  /**
   * @type {JSX.Element}
   */
  let el;
  switch (message.contentType) {
    case "PlainText":
      el = <span className="d-block">{message.content}</span>;
      break;
    case "ImageResponseCard":
      const card = message.imageResponseCard;
      /**
       * Speech bubble w/
       * 1. Title at the top of the bubble
       * 2. (optional) Subtitle (smaller text) at the bottom of the bubble
       * 3. (optional) button(s) below the bubble
       *
       * @type {JSX.Element}
       */
      el = (
        <div className="border border-2 border-accent p-3 rounded-2">
          <b className="mb-0">{card.title}</b>
          {card.subtitle && <p className="mb-0">{card.subtitle}</p>}
          {card.buttons && (
            <div className="d-flex flex-column">
              {card.buttons.map((b, i) => (
                <button
                  className="btn btn-outline-dark mt-2"
                  key={i}
                  type="button"
                >
                  {b.text}
                </button>
              ))}
            </div>
          )}
        </div>
      );
      break;
    default:
      el = JSON.stringify(message);
  }

  return <div className="d-flex flex-column mb-3">{el}</div>;
}
