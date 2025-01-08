import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FacialExpression } from '../../components/avatar';

interface Message {
  text: string;
  audio: string;
  lipsync: {
    metadata: {
      soundFile: string; // Ex. "/Users/nmura/dev/perso/ia-tests/travis-media/chatgpt-interviewer-bot-backend/audios/message_0.wav",
      duration: number;
    };
    mouthCues: {
      start: number;
      end: number;
      value: string; // Ex. "X", "A", "B", "C", "D", "E", "F"
    }[];
  };
  facialExpression: FacialExpression;
  animation: string;
}

// const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const backendUrl = 'http://localhost:3000';

interface ChatContextType {
  chat: (text?: string) => Promise<void>;
  message: Message | null;
  onMessagePlayed: () => void;
  loading: boolean;
  // cameraZoomed: boolean;
  // setCameraZoomed: (zoomed: boolean) => void;
}

const ChatContext = createContext<ChatContextType>({
  chat: async (text?: string) => {
    console.warn('Chat function is not implemented.');
  },
  message: null,
  onMessagePlayed: () => {
    console.log('Message played');
  },
  loading: false,
  // cameraZoomed: true,
  // setCameraZoomed: () => {},
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const chat = async (text?: string) => {
    setLoading(true);
    // const data = await fetch(`${backendUrl}/chat`, {
    const data = await fetch(`${backendUrl}/talk-text-v2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: text ?? '' }),
    });
    const resp = (await data.json()).messages;
    console.log(resp);
    setMessages((messages) => [...messages, ...resp]);
    setLoading(false);
  };
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  // const [cameraZoomed, setCameraZoomed] = useState(true);
  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        // cameraZoomed,
        // setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
