import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

interface Message {
  id: number;
  sender_id: number;
  room_id: number;
  message: string;
  created_at: string;
  sender_username: string;
}

interface ChatBoxProps {
  socket: any;
  room: any;
  sendMessage: (input: any) => void;
  messages: Message[];
  profile: any;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  socket,
  room,
  sendMessage,
  messages,
  profile,
}) => {
  const { theme } = useTheme();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const yourSenderId = profile?.id;
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      console.log("input: ", input);
      sendMessage(input);
      setInput("");
    }
  };

  useEffect(() => {
    return () => {};
  }, [room]);

  return (
    <div className="w-2/4 flex flex-col">
      <div className="flex-1 flex flex-col p-4 shadow rounded-lg overflow-y-scroll">
        <div
          className={`flex flex-col p-4 shadow rounded-lg overflow-y-scroll border ${
            theme === "dark" ? "border-white" : "border-black"
          }`}
        >
          <div className="text-4xl">{room.chatName}</div>
        </div>
        <div className="flex-1 mt-4 h-[400px] overflow-y-auto flex flex-col-reverse">
          {messages.length ? (
            messages?.map((msg, index) => (
              <div
                key={index}
                className={`my-2 flex items-start ${
                  msg.sender_id === yourSenderId ? "justify-end" : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full bg-gray-300 ${
                    msg.sender_id === yourSenderId ? "ml-3 order-2" : "mr-3"
                  }`}
                ></div>
                <div
                  className={`border p-2 rounded-md ${
                    msg.sender_id === yourSenderId
                      ? "text-right pr-2 pl-10 bg-messageRight"
                      : "text-left pr-10 pl-2"
                  }`}
                >
                  {msg.sender_id !== yourSenderId && (
                    <span className="text-sm block">{msg.sender_username}</span>
                  )}{" "}
                  <p className="text-xl break-words">{msg.message}</p>
                  <span className="text-xs">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center">No chat found</div>
          )}
        </div>
        <div
          className={`flex items-end p-2 border rounded-lg ${
            theme === "dark" ? "border-white" : "border-black"
          }`}
        >
          <form className="flex w-full gap-2" onSubmit={handleSend}>
            <div className="flex items-center gap-2">
              <label htmlFor="file-input" className="cursor-pointer">
                <img
                  src="/attach.png"
                  alt="Attach"
                  className="w-8 h-8 sm:w-10 sm:h-10 p-2 rounded-md light"
                />
              </label>
              <input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <input
              type="text"
              placeholder="Type your message..."
              className={`flex-1 p-2 rounded-lg sm:text-base text-sm focus:outline-none ${
                theme === "dark" ? "dark" : "light"
              }`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="flex-shrink-0">
              <img
                src="/image.png"
                alt="send"
                className="w-8 h-8 sm:w-10 sm:h-10 p-2 light rounded-md"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
