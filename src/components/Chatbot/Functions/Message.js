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
      el = (
        <div className="bg-light mt-2 px-2 py-1 rounded">{message.content}</div>
      );
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
        <>
          <div className="bg-light mb-1 mt-2 px-2 py-1 rounded">
            <div>{card.title}</div>
            {card.subtitle && (
              <small className="d-block">{card.subtitle}</small>
            )}
          </div>
          {card.buttons && (
            <div className="d-flex flex-wrap gap-1 mx-1">
              {card.buttons.map(({ text, value }) => (
                <button
                  className="btn btn-primary btn-solid fs-6 px-2 py-1"
                  key={value}
                  onClick={() => alert(value)}
                >
                  {text}
                </button>
              ))}
            </div>
          )}
        </>
      );
      break;
    default:
      el = JSON.stringify(message);
  }

  return el;
}
