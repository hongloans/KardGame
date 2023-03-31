export type Message = {
  id: string;
  user: string;
  content: string;
};

export type SocketMessage = {
  type: string;
  payload: Message;
};
