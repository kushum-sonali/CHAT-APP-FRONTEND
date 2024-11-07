import './App.css';
import { useEffect, useState } from 'react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { useParams } from 'react-router-dom';

interface AppProps {
  username: string | null;
  isAdmin: boolean; // Added to determine if the current user is admin
  roomId:string
}

const App: React.FC<AppProps> = ({ username, isAdmin }) => {
  const { roomId } = useParams<{ roomId: string }>(); // Get roomId from URL
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<{ user: string, message: string, role: string }[]>([]);
  const [input, setInput] = useState('');

  // Initialize WebSocket when a username is set
  useEffect(() => {
    console.log("from url",username,roomId);
    if (username && roomId) {
      
      const ws = new WebSocket(`wss://chat-app-backend-cx4t.onrender.com/${roomId}`);
      ws.onopen = () => {
        console.log("Connected to WebSocket server");
        ws.send(JSON.stringify({ type: 'join', username, role: isAdmin ? 'admin' : 'user' }));
      };
 
      ws.onmessage = (e) => {
        const parseData = JSON.parse(e.data);
        if (parseData.type === 'init') {
          setMessages(parseData.messages);
        } else if (parseData.type === 'message') {
          setMessages((prev) => [...prev, { user: parseData.user, message: parseData.message, role: parseData.role }]);
        }
      };

      ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [username, roomId, isAdmin]);

  // Send a message
  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN && input) {
      const messageData = { type: 'message', user: username, message: input, role: isAdmin ? 'admin' : 'user' };
      socket.send(JSON.stringify(messageData));
      setInput('');
    }
  };

  // Handle Enter key
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  // Clear chat
  const clearChat = () => {
    fetch(`/api/messages/${roomId}`, { method: 'DELETE' })
      .then(() => setMessages([]))
      .catch((error) => console.error('Error clearing messages:', error));
  };

  return (
    <div className="App min-h-screen bg-gray-800 text-white flex flex-col items-center">
      <h1 className="text-3xl font-semibold mt-8">
        Chat Room by {username} ({isAdmin ? "Admin" : "User"})
      </h1>
      <span>Room ID: {roomId}</span>
      <span>Shareable Link: http://yourapp.com/room/{roomId}</span>

      <div className="w-full max-w-2xl bg-gray-700 p-4 rounded-lg mt-6 shadow-md overflow-y-auto h-80">
        {messages.map((msg, index) => (
          <div key={index} className={`flex mb-2 ${msg.user === username ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`p-2 rounded-xl inline-block ${msg.user === username ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}
              style={{ maxWidth: '70%', wordWrap: 'break-word' }}
            >
              {msg.user === username ? (
                <span className="block text-sm font-medium">{msg.message}</span>
              ) : (
                <span className="block text-sm font-medium">
                  <strong>{msg.user} ({msg.role === 'admin' ? 'Admin' : 'User'}):</strong> {msg.message}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-2xl mt-4">
        <Input
          type="text"
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          className="w-full p-2 rounded-l-lg border-none focus:outline-none bg-white text-black"
        />
        <Button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-all"
        >
          Send
        </Button>
        <Button
          onClick={clearChat}
          className="ml-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
        >
          Clear Chat
        </Button>
      </div>
    </div>
  );
};

export default App;
