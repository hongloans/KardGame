import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import WebSocket from 'isomorphic-ws';
import { Message, SocketMessage } from './types';
import { nameState } from '../../store/name';
import { useRecoilState } from 'recoil';

function Chat(): React.ReactElement {
  const hostIP = process.env.HOST_NAME;
  const [userName, setUserName] = useRecoilState(nameState);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const socket = new WebSocket(`ws://${hostIP}:8080`);

    socket.onopen = (): void => {
      console.log('서버와 웹소켓 연결됨');
    };

    socket.onmessage = (event): void => {
      const data: SocketMessage = JSON.parse(event.data.toString());
      if (data.type === 'message') {
        setMessages(messages => [...messages, data.payload]);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setInputValue(event.target.value);
  };

  const handleSendButtonClick = (): void => {
    event?.preventDefault();
    const socket = new WebSocket(`ws://${hostIP}:8080`);
    socket.onopen = (): void => {
      const message: Message = {
        id: uuidv4(),
        user: userName,
        content: inputValue,
      };
      const socketMessage: SocketMessage = {
        type: 'message',
        payload: message,
      };
      socket.send(JSON.stringify(socketMessage));
      setInputValue('');
    };
  };

  return (
    <div>
      <ul>
        {messages &&
          messages.map(message => (
            <li key={message.id}>
              <strong>{message.user}: </strong>
              {message.content}
            </li>
          ))}
      </ul>
      <form onSubmit={handleSendButtonClick}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}

export default Chat;
