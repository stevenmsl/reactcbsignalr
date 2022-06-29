import React, { useEffect, useState, useRef } from "react";
import {
  HubConnectionBuilder,
  HubConnection,
  HubConnectionState,
} from "@microsoft/signalr";
import { ChatMessage } from ".";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

const Chat = () => {
  const [conn, setConn] = useState<HubConnection>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const prevMessages = useRef<ChatMessage[]>();

  /*  */
  useEffect(() => {
    prevMessages.current = messages;
  }, [messages]);

  /*TA#01 configure the connection */
  useEffect(() => {
    const newConn = new HubConnectionBuilder()
      .withUrl("https://localhost:7060/hub")
      .withAutomaticReconnect()
      .build();
    setConn(newConn);
  }, []);

  useEffect(() => {
    const tryConnect = async () => {
      if (!conn) return;
      try {
        await conn.start();
        console.log("connected!");
        /* TA#03 */
        conn.on("ReceiveMessage", (message: ChatMessage) => {
          console.log("message received:", message);
          if (prevMessages.current) {
            const updated = [...prevMessages.current];
            updated.push(message);
            //console.log(updated);
            setMessages(updated);
          }
        });
      } catch (e: any) {
        console.log("Connection failed:", e);
      }
    };

    tryConnect();
  }, [conn]);

  const sendMessage = async (msg: ChatMessage) => {
    if (conn?.state === HubConnectionState.Connected) {
      try {
        /*TA#02 */
        await conn.send("SendMessage", msg);
      } catch (e: any) {
        console.log(e);
      }
    } else {
      alert("No connection!");
    }
  };

  return (
    <div>
      <ChatInput sendMessage={sendMessage} />
      <hr />
      <ChatWindow messages={messages} />
    </div>
  );
};

export default Chat;
