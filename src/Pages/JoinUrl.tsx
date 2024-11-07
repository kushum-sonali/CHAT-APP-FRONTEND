import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface JoinFormProps {
  onJoin: (username: string, roomId: string | null) => void;
}

const JoinUrl: React.FC<JoinFormProps> = ({ onJoin }) => {
  const { roomId: paramRoomId } = useParams<{ roomId?: string }>(); // Get roomId from URL
  const roomId = paramRoomId || null; // Ensure roomId is either string or null

  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim() !== '') {
      localStorage.setItem('username', username);
    
      onJoin(username, roomId); // Pass roomId as string or null
      navigate(`/room/${roomId}`); // Redirect to room details page
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 animate-fadeIn">
            Join the Invited Chat Room {username}
          </h2>
          <div className="mb-6 animate-slideIn">
            <Label htmlFor="username" className="block text-gray-700 mb-2 font-medium">
              Enter Your Username
            </Label>
            <Input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Your Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out animate-fadeInUp"
          >
            Join Invited Room
          </button>
        </div>
      </form>
    </>
  );
};

export default JoinUrl;
