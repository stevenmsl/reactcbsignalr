import { FC } from "react";
import { ChatMessage } from ".";

interface MessageProps {
  chatMessage: ChatMessage;
}

const Message: FC<MessageProps> = ({ chatMessage }) => {
  const { user, message } = chatMessage;
  return (
    <div>
      <p>
        <strong>{user}</strong> says:
      </p>
      <p>{message}</p>
    </div>
  );
};

export default Message;
