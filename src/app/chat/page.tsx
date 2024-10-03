"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import GroupInfo from "../components/GroupInfo";
import { getCookie } from "../../utils/tools";

const token = getCookie("token");

const socket = io("http://localhost:8000", {
  auth: {
    token, // Replace with the token obtained after login
  },
});
interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  // const [message, setMessage] = useState("heloo");
  const [room, setRoom] = useState("room1");

  useEffect(() => {
    // Listen for private messages
    socket.on("private_message", (msg: any) => {
      console.log("msg:=========> ", msg);
      setMessages((prev) => [...prev, msg]);
    });

    // Listen for room messages
    socket.on("room_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("private_message");
      socket.off("room_message");
    };
  }, []);

  const sendPrivateMessage = (to: any, message: any) => {
    socket.emit("private_message", { to, message });
  };

  const sendRoomMessage = (message: any) => {
    socket.emit("room_message", { roomId: room, message });
  };

  const joinRoom = () => {
    socket.emit("join_room", room);
  };

  return (
    <div className="flex lg:h-[92vh]">
      <Sidebar />
      <ChatBox
        socket={socket}
        sendPrivateMessage={sendPrivateMessage}
        messages={messages}
      />{" "}
      {/* Pass sendMessage and messages as props */}
      <GroupInfo />
    </div>
  );
};

export default ChatPage;
