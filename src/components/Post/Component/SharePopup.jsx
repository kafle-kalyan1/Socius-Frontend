import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip, message } from "antd";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
  TelegramShareButton,
  LineShareButton,
  ViberShareButton,
  VKShareButton,
  OKShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailIcon,
  PinterestIcon,
  RedditIcon,
  TumblrIcon,
  TelegramIcon,
  LineIcon,
  ViberIcon,
  VKIcon,
  OKIcon,
} from "react-share";
import { copy } from "../../../Library/Others/Others";
import toast from "react-hot-toast";

const Share = ({ id, postText, images }) => {
  const url = `${window.location.origin}/post/${id}`;
  const [copySuccess, setCopySuccess] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const shareButtons = [
    { Button: FacebookShareButton, Icon: FacebookIcon, text: "Facebook" },
    { Button: TwitterShareButton, Icon: TwitterIcon, text: "Twitter" },
    { Button: WhatsappShareButton, Icon: WhatsappIcon, text: "Whatsapp" },
    { Button: LinkedinShareButton, Icon: LinkedinIcon, text: "Linkedin" },
    { Button: EmailShareButton, Icon: EmailIcon, text: "Email" },
    { Button: PinterestShareButton, Icon: PinterestIcon, text: "Pinterest" },
    { Button: RedditShareButton, Icon: RedditIcon, text: "Reddit" },
    { Button: TumblrShareButton, Icon: TumblrIcon, text: "Tumblr" },
    { Button: TelegramShareButton, Icon: TelegramIcon, text: "Telegram" },
    { Button: LineShareButton, Icon: LineIcon, text: "Line" },
    { Button: ViberShareButton, Icon: ViberIcon, text: "Viber" },
    { Button: VKShareButton, Icon: VKIcon, text: "VK" },
    { Button: OKShareButton, Icon: OKIcon, text: "OK" },
  ];

  const handleCopy = async (url) => {
    setCopySuccess(true);
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard");
    message.success("Link Copied!");
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      setCopySuccess(false);
    }, 10);
    setTimeoutId(newTimeoutId);
  };
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-4 w-full text-text1 dark:text-text2 p-6 text-center items-center">
      {shareButtons.map(({ Button, Icon, text }, index) => (
        <Tooltip key={index} title={text}>
          <div className="flex flex-col items-center">
            <Button url={url} title={postText}>
              <Icon size={32} round={true} />
            </Button>
            <p className="text-xs mt-1">{text}</p>
          </div>
        </Tooltip>
      ))}

      <div className="flex items-center col-span-3 sm:col-span-2 mt-4">
        <div className="flex-grow">
          <input
            readOnly
            className="ml-2 border border-gray-300 p-1 rounded-md text-text1 dark:text-text2 dark:bg-darkcardBg dark:border-darkcardBorder w-full"
            value={url}
          />
        </div>
        <div className="ml-4">
          <button
            className="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-cardBg text-text1 dark:text-text2 dark:bg-darkcardBg hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            onClick={() => handleCopy(url)}
          >
            {copySuccess==true ? "Link Copied!" : "Copy Link"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;