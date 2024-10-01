'use client';

import { useChat } from 'ai/react';
import { useEffect } from 'react';

export default function TestingPage() {
  const { messages, input, setInput, append } = useChat({
    id: 'planet-namek',
    api: '/api/chat/groq',
  });

  useEffect(() => {
    console.log('🚀 ~ TestingPage ~ messages:', messages);
  }, [messages]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <input
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyDown={async (event) => {
          if (event.key === 'Enter') {
            append({ content: input, role: 'user' });
          }
        }}
      />

      {messages.map((message, index) => (
        <div key={index}> {message.content}</div>
      ))}
    </div>
  );
}
