import React, { useEffect, useState } from "react";

// Define the shape of a message object
interface Message {
  id: number;
  sender_id: number;
  room_id: number;
  message: string;
  created_at: string;
  sender_username: string;
}

interface ChatBoxProps {
  socket: any; // You can provide a specific type here if needed
  room: any; // You can provide a specific type here if needed
  sendMessage: (input: any) => void;
  messages: Message[]; // Array of message objects
}

const ChatBox: React.FC<ChatBoxProps> = ({
  socket,
  room,
  sendMessage,
  messages,
}) => {
  const [input, setInput] = useState(""); // State for handling input
  const yourSenderId = 7;
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      console.log("input:>>>>>>>>>>>> ", input);
      sendMessage(input); // Call the sendMessage function passed as a prop
      setInput(""); // Clear input field after sending
    }
  };

  useEffect(() => {
    console.log("room: ", room);
    return () => {};
  }, [room]);

  return (
    <div className="w-2/4 flex flex-col">
      <div className="flex-1 flex flex-col p-4 bg-red-500 shadow rounded-lg overflow-y-scroll">
        {/* Chat Header */}
        <div className="flex flex-col p-4 bg-red-900 shadow rounded-lg overflow-y-scroll">
          <div className="text-4xl">Room Name: {room.chatName}</div>
        </div>

        {/* Messages List */}
        <div className="flex-1 mt-4 h-[400px] overflow-y-auto flex flex-col-reverse">
          {messages.length ? (
            messages?.map((msg) => (
              <div
                key={msg.id}
                className={`my-2 flex items-start ${
                  msg.sender_id === yourSenderId ? "justify-end" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full bg-gray-300 ${
                    msg.sender_id === yourSenderId ? "ml-3 order-2" : "mr-3"
                  }`}
                ></div>
                <div
                  className={`ml-3 ${
                    msg.sender_id === yourSenderId ? "text-right" : "text-left"
                  }`}
                >
                  <span className="text-xl">{msg.sender_username}</span>
                  <p>{msg.message}</p>
                  <span className="text-xs">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div>No chat found</div>
          )}
        </div>

        {/* Input area fixed at the bottom */}
        <div className="flex items-end p-3 rounded-lg bg-green-200">
          <form className="w-full" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full p-2 rounded-lg focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)} // Handle input change
            />
            <button type="submit" className="">
              Send
            </button>{" "}
            {/* Hidden submit button */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
