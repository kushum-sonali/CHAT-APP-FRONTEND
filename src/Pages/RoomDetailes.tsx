import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface RoomDetailsProps {
  username: string;
  invitedUsers: string[]; // Add invitedUsers to the interface
} 

const RoomDetails: React.FC<RoomDetailsProps> = ({ username, invitedUsers }) => {
  const navigate = useNavigate();
  const {roomId}= useParams<string>();

  // Generate shareable URL
  const shareableUrl = `${window.location.origin}/join/${roomId}`;

  const goToChatRoom = () => {
    if (roomId) {
      navigate(`/room/${roomId}`);
    }
  };
  return (
    // <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
    //   <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center">
    //     <h2 className="text-2xl font-semibold mb-4">Room Created Successfully by {username}</h2>
    //     <p className="mb-4">Room Code: <strong>{roomId}</strong></p>
    //     <p className="mb-6">Share this URL to invite others:</p>
    //     <div className="bg-gray-600 text-white p-2 rounded-lg mb-4">
    //       <input
    //         type="text"
    //         value={shareableUrl}
    //         readOnly
    //         className="bg-gray-600 text-white p-2 w-full rounded-lg"
    //       />
    //     </div>
    //     <button
    //       className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 mb-4"
    //       onClick={() => navigator.clipboard.writeText(shareableUrl)}
    //     >
    //       Copy URL
    //     </button>
    //     <button
    //       className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
    //       onClick={goToChatRoom}
    //     >
    //       Go to Chat Room
    //     </button>
    //     <div className="mt-6">
    //       <h3 className="text-lg font-semibold">Invited Users:</h3>
    //       <ul>
    //         <li>{username} (Admin)</li>
    //         {invitedUsers.map((user, index) => (
    //           <li key={index}>{user}</li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
    <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold mb-4">Create Chat Room by {username}</h2>
      <p className="mb-4">Room Id: <strong>{roomId || 'N/A'}</strong></p> {/* Display 'N/A' if roomId is undefined */}
      <p className="mb-2">Participants:</p>
      <ul className="mb-6">
        <li>{username} (Admin)</li>
        {invitedUsers.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      <p className="mb-6">Share this URL to invite others:</p>
       <div className="bg-gray-600 text-white p-2 rounded-lg mb-4">
      <input
            type="text"
            value={shareableUrl}
            readOnly
            className="bg-gray-600 text-white p-2 w-full rounded-lg"
          />
        </div>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 mb-4"
          onClick={() => navigator.clipboard.writeText(shareableUrl)
           
          }
        >
          Copy URL
        </button>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        onClick={goToChatRoom}
        disabled={!roomId} // Disable button if roomId is undefined
      >
        Go to Chat Room
      </button>
    </div>
  </div>
  );
};

export default RoomDetails;
