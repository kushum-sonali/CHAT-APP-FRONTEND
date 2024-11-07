import React, { useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import JoinForm from './JoinForm';
import JoinUrl from './JoinUrl';
import RoomDetails from './RoomDetailes';
import App from '../App';

const RouterWrapper: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]); // Define invitedUsers state
  const [isAdmin , setIsAdmin]=useState<boolean>(false);

  // Handle admin creating a room
  const handleUserJoin = (name: string, id: string) => {
    setUsername(name);
    setRoomId(id);
    setIsAdmin(true);
  };

  // Handle invited users joining the room
  const handleInviteJoin = (name: string) => {
    setUsername(name);
    setInvitedUsers((prev) => [...prev, name]); // Add invited user to the list
  };

  return (
    
      <Routes>
        <Route path="/" element={<JoinForm onJoin={handleUserJoin} />} />
        <Route path="/room/:roomId" element={<App username={username}  isAdmin={isAdmin} roomId={roomId || ''}/>} />
        <Route path="/join/:roomId" element={<JoinUrl onJoin={handleInviteJoin} />} />
        <Route
          path="/room-details/:roomId"
          element={<RoomDetails username={username || ''}  invitedUsers={invitedUsers} />}
        />
      </Routes>
   
  );
};

export default RouterWrapper;
