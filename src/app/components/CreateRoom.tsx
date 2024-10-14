"use client";
import React, { useState, useContext, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { ErrorContext } from "@/contexts/ErrorContext";

interface Participant {
  id: string;
  username: string;
}

const CreateRoom = ({
  onClose,
  handleChatClick,
}: {
  onClose: () => void;
  handleChatClick: (id: any) => void;
}) => {
  const [roomName, setRoomName] = useState<string>("");
  const [isGroup, setIsGroup] = useState<boolean>(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const [allParticipants, setAllParticipants] = useState<Participant[]>([]);
  const { addError } = useContext(ErrorContext);

  // Handle room creation
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    if (participants.length === 0) {
      addError("Please select at least one participant.");
      return;
    }
    try {
      const response = await axiosInstance.post(
        "/chats/room",
        {
          name: roomName || null,
          isGroup,
          participants,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsGroup(false);
      setParticipants([]);
      handleChatClick({ id: response.data.id, chatName: response.data.name });
      onClose(); // Close modal after successful creation
    } catch (error) {
      console.error("Error creating room:", error);
      addError("Failed to create room.");
    }
  };

  const handleRoomChange = async (participant: any) => {
    try {
      const response = await axiosInstance.post(
        "/chats/room",
        {
          name: roomName || null,
          isGroup,
          participants: [participant.id],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsGroup(false);
      setParticipants([]);
      handleChatClick({ id: response.data.id, chatName: participant.username });
      onClose(); // Close modal after successful creation
    } catch (error) {
      console.error("Error creating room:", error);
      addError("Failed to create room.");
    }
  };

  // Handle participant selection
  const handleParticipantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(e.target.value);
    setParticipants((prev: any) =>
      prev.includes(selectedId)
        ? prev.filter((id: any) => id !== selectedId)
        : [...prev, selectedId]
    );
  };

  // Fetch all available users/participants
  const fetchParticipants = async () => {
    try {
      const response = await axiosInstance.get("/user/all", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAllParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
      addError("Failed to fetch participants.");
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <div className="fixed theme inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-4 hover:text-blue-200"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">Create a Room</h2>
        <form onSubmit={handleCreateRoom}>
          <div className="flex mb-4">
            <label htmlFor="isGroup" className="flex text-sm font-medium">
              Is Group Chat:
            </label>
            <input
              type="checkbox"
              id="isGroup"
              checked={isGroup}
              onChange={() => setIsGroup(!isGroup)}
              className="flex m-1"
            />
          </div>

          {isGroup && (
            <div className="mb-4 animate-bounce">
              <label htmlFor="roomName" className=" text-sm font-medium ">
                Room Name:
              </label>
              <input
                type="text"
                id="roomName"
                value={roomName}
                required
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
                className="mt-1 p-2 border light border-gray-300 rounded w-full"
              />
            </div>
          )}

          <div className="mb-4">
            <label className=" text-sm font-medium">Participants:</label>
            <div className="mt-1 space-y-2">
              {allParticipants.map((participant) => (
                <div key={participant.id} className="flex items-center">
                  {isGroup && (
                    <input
                      type="checkbox"
                      value={participant.id}
                      checked={participants.includes(participant.id)}
                      onChange={handleParticipantChange}
                      className="mr-2"
                    />
                  )}
                  <label onClick={() => handleRoomChange(participant)}>
                    {participant.username}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {isGroup ? (
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
            >
              Create Room
            </button>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
