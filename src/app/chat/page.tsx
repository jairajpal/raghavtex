"use client";
import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import GroupInfo from "../components/GroupInfo";
import { getCookie, handleApiError } from "../../utils/tools";
import axiosInstance from "@/utils/axiosInstance";
import { ErrorContext } from "@/contexts/ErrorContext";

const token = getCookie("token");

const socket = io("http://localhost:8000", {
  auth: {
    token, // Replace with the token obtained after login
  },
});

interface Message {
  id: number;
  sender_id: number;
  room_id: number;
  message: string;
  created_at: string;
  sender_username: string;
}

interface Chat {
  id: number; // Should be number as per JSON
  name: string | null; // Can be null based on the JSON
  is_group: boolean; // Added is_group property based on JSON
  created_at: string; // Keep as string (ISO date format)
  last_message: string | null; // Can be null based on the JSON
  last_message_time: string | null; // Can be null based on the JSON
  participants_usernames: string[]; // Should be a string array
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const { addError } = useContext<any>(ErrorContext);
  const [room, setRoom] = useState<any>({});

  const changeRoom = (room: any) => {
    setRoom(room);
  };

  const getAllChats = async () => {
    try {
      const response = await axiosInstance.get("/chats/users/rooms", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setChats(response.data);
      if (response.data.length) {
        console.log("chats: lengthlengthlength", response.data);
        // setRoom({
        //   id: response.data[0].id,
        //   chatName: response.data[0].is_group
        //     ? response.data[0].name
        //     : response.data[0].participants_usernames[0],
        // });
      }
    } catch (error: any) {
      handleApiError(error, addError);
    }
  };

  const getMessagesForRoom = async () => {
    try {
      console.log("room:hereeee ", room);
      if (room?.id) {
        const response = await axiosInstance.get(
          `/chats/rooms/${room.id}/messages`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log("response.data:============> ", response.data);
        setMessages(response.data);
      }
    } catch (error: any) {
      handleApiError(error, addError);
    }
  };

  const sendMessage = async (input: string) => {
    try {
      if (room?.id) {
        const response = await axiosInstance.post(
          `/chats/rooms/${room.id}/messages`,
          {
            roomId: room.id,
            message: input,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // Append the sent message to messages
        console.log("messages: ", messages);
        console.log("response.data: ===========>", response.data);
        setMessages((prev) => [response.data, ...prev]);
      }
    } catch (error: any) {
      handleApiError(error, addError);
    }
  };
  // useEffect(() => {}, [chats]);

  useEffect(() => {
    getAllChats();

    console.log("room: ", room);
    if (room?.id) {
      getMessagesForRoom();
    }

    // Listen for socket messages
    socket.on("private_message", (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("room_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("message-update", (updatedChat) => {
      setChats((prevChats) => [...prevChats, updatedChat]);
    });

    return () => {
      socket.off("private_message");
      socket.off("room_message");
      socket.off("message-update");
    };
  }, [room]);

  // useEffect(() => {
  //   return () => {};
  // }, [room]);

  return (
    <div className="flex lg:h-[92vh]">
      <Sidebar chats={chats} changeRoom={changeRoom} />
      <ChatBox
        socket={socket}
        room={room}
        sendMessage={sendMessage}
        messages={messages}
      />
      <GroupInfo />
    </div>
  );
};

export default ChatPage;
