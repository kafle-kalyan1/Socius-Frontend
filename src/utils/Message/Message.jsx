import  { useState, useEffect } from "react";
import errorSVG from "/src/utils/Svg/ERROR.svg";

const Message = ({
  message,
  position = "topRight",
  type,
  duration = 3000,
  button1 = null,
  button2 = null,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  const getPositionClasses = () => {
    switch (position) {
      case "topRight":
        return "absoute top-5 right-4";
      case "topLeft":
        return "absoute top-5 left-4";
      case "bottomRight":
        return "absoute bottom-5 right-4";
      case "bottomLeft":
        return "absoute bottom-5 left-4";
      case "topMiddle":
        return "absoute top-5 left-1/2 transform -translate-x-1/2";
      default:
        return "top-5 right-4";
    }
  };

  const getMessageColor = () => {
    switch (type) {
      case "success":
        return "green";
      case "error":
        return "red";
      case "info":
        return "blue";
      case "warning":
        return "yellow";
      default:
        return "gray";
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`w-max p-3 mt-8 bg-${getMessageColor()}-100 rounded flex flex-shrink items-center ${getPositionClasses()}`}
    >
      <div
        tabIndex="0"
        aria-label={`${type} icon`}
        role="img"
        className={`focus:outline-none w-8 h-8 border rounded-full border-${getMessageColor()}-200 flex flex-shrink-0 items-center justify-center`}
      >
        <img src={errorSVG} alt="ERROR" />
      </div>
      <div className="pl-3 w-full">
        <div className="flex items-center justify-between">
          <p
            tabIndex="0"
            className={`focus:outline-none text-sm leading-none text-${getMessageColor()}-700`}
          >
            {message}
          </p>
          {button1 && (
            <button className="text-xs leading-3 underline cursor-pointer text-green-700">
              {button1}
            </button>
          )}
          {button2 && (
            <button className="text-xs leading-3 underline cursor-pointer text-green-700">
              {button2}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


export default Message;
