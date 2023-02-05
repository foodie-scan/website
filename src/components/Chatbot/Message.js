import { useMemo, useState } from "react";

/**
 * @typedef {Parameters<typeof ChatbotButtons>[0]} ChatbotButtonsProps
 * @param {{
 *  from_user: true,
 *  message: {
 *    content: string,
 *    contentType: "PlainText"
 *  }
 * } | {
 *  from_user: false,
 *  message: {
 *    contentType: "ImageResponseCard",
 *    imageResponseCard?: {
 *      subtitle?: string,
 *      title: string
 *    }
 *  }
 * } | {
 *  buttonsOnClick: (value: string) => Promise<void>,
 *  from_user: false,
 *  message: {
 *    contentType: "ImageResponseCard",
 *    imageResponseCard?: {
 *      buttons: ChatbotButtonsProps["buttons"],
 *      subtitle?: string,
 *      title: string
 *    }
 *  }
 * }} param0
 */
export default function ChatbotMessage({ buttonsOnClick, from_user, message }) {
  const [buttons, setButtons] = useState();
  const class_names = useMemo(
    function () {
      return from_user
        ? { container: "ms-auto", message_bg: "info" }
        : { container: "me-auto", message_bg: "light" };
    },
    [from_user]
  );

  /**
   * @type {JSX.Element}
   */
  const el = useMemo(
    function () {
      switch (message.contentType) {
        case "PlainText":
          return (
            <div
              className={`mt-2 px-2 py-1 rounded bg-${class_names.message_bg}`}
            >
              {message.content}
            </div>
          );
        case "ImageResponseCard":
          const card = message.imageResponseCard;
          setButtons(
            <div className="d-flex flex-wrap gap-1 justify-content-end mt-1 mx-1">
              {card.buttons.map(function ({ text, value }) {
                return (
                  <button
                    className="btn btn-info btn-solid fs-6 px-2 py-1"
                    key={value}
                    onClick={function () {
                      setButtons();
                      return buttonsOnClick(text, value);
                    }}
                    type="button"
                  >
                    {text}
                  </button>
                );
              })}
            </div>
          );
          /**
           * Speech bubble w/
           * 1. Title at the top of the bubble
           * 2. (optional) Subtitle (smaller text) at the bottom of the bubble
           * 3. (optional) button(s) below the bubble
           */
          return (
            <div className="bg-light mt-2 px-2 py-1 rounded w-fit">
              <div>{card.title}</div>
              {card.subtitle && (
                <small className="d-block">{card.subtitle}</small>
              )}
            </div>
          );
        default:
          return JSON.stringify(message);
      }
    },
    [buttonsOnClick, class_names, message]
  );

  return (
    <div className={`max-w-75 w-fit ${class_names.container}`}>
      {el}
      {buttons && buttons}
    </div>
  );
}
