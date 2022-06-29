import { FC, FormEventHandler, useState, ChangeEventHandler } from "react";
import { ChatMessage } from ".";

interface ChatInputProps {
  sendMessage: (chatMessage: ChatMessage) => void;
}

const ChatInput: FC<ChatInputProps> = ({ sendMessage }) => {
  const [user, setUser] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    /* don't want to submit to the server */
    e.preventDefault();
    const validUser = user && user.trim().length > 0;
    const validMessage = message && message.trim().length > 0;

    if (validUser && validMessage) sendMessage({ user, message });
    else alert("user and message can't be empty");
  };

  const onUserChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser(e.target.value);
  };

  const onMessageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="user">User:</label>
      <br />
      <input id="user" name="user" value={user} onChange={onUserChange}></input>
      <br />
      <label htmlFor="message">Message:</label>
      <br />
      <input
        id="message"
        name="message"
        value={message}
        onChange={onMessageChange}
      />
      <br /> <br />
      <button>Submit</button>
    </form>
  );
};

export default ChatInput;
