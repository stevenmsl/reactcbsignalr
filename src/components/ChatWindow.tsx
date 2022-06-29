import { FC } from "react";
import { ChatMessage } from ".";
import Message from "./Message";
interface ChatWindowProps {
  messages: ChatMessage[];
}
const ChatWindow: FC<ChatWindowProps> = ({ messages }) => {
  const list = messages.map((m) => (
    <Message key={Date.now() * Math.random()} chatMessage={m} />
  ));

  return <div>{list}</div>;
};

export default ChatWindow;
