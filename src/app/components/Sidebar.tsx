// Sidebar.tsx
import React, { useEffect, useState } from "react";
import CreateRoom from "../components/CreateRoom";

interface Chat {
  id: number; // Should be number as per JSON
  name: string | null; // Can be null based on the JSON
  is_group: boolean; // Added is_group property based on JSON
  created_at: string; // Keep as string (ISO date format)
  last_message: string | null; // Can be null based on the JSON
  last_message_time: string | null; // Can be null based on the JSON
  participants_usernames: string[]; // Should be a string array
}

interface SidebarProps {
  chats: Chat[];
  changeRoom: (room: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, changeRoom }) => {
  const [showCreateRoom, setShowCreateRoom] = useState(false); // State to show/hide CreateRoom component
  const onClose = () => {
    setShowCreateRoom(false);
  };
  const handleChatClick = (chat: any) => {
    if (chat.chatName) {
      changeRoom({
        id: chat.id,
        chatName: chat.chatName,
      });
    } else {
      changeRoom({
        id: chat.id,
        chatName: chat.is_group ? chat.name : chat.participants_usernames[0],
      });
    }
  };
  useEffect(() => {}, [chats]);

  return (
    <div className="w-1/4 p-4 bg-blue-300 rounded-lg">
      <div className="flex items-center justify-between p-2 rounded-lg shadow">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 text-sm rounded-md focus:outline-none"
        />
        <button
          onClick={() => setShowCreateRoom(true)}
          className="create-room-btn bg-blue-500 text-white py-2 px-4 rounded"
        >
          Create Room
        </button>
        {/* Conditionally render the CreateRoom component */}
        {showCreateRoom && (
          <div className="create-room-modal bg-white p-6 rounded shadow-lg fixed inset-0 z-50 flex justify-center items-center bg-opacity-40">
            <div className="relative">
              <CreateRoom onClose={onClose} handleChatClick={handleChatClick} />
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        {chats.length ? (
          chats.map((chat: any, index: any) => (
            <div
              key={index}
              className={`p-3 rounded-lg cursor-pointer`}
              onClick={() => handleChatClick(chat)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full"></div>
                <div className="ml-3">
                  <p className="font-semibold">
                    {chat.is_group ? chat.name : chat.participants_usernames[0]}
                  </p>
                  <p className="text-sm">{chat.last_message}</p>
                </div>
              </div>
              <span className="text-xs">{chat.last_message_time}</span>
            </div>
          ))
        ) : (
          <div>nothing to show</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
