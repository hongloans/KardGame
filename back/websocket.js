const WebSocket = require("ws");

// 웹소켓 서버 생성
const server = new WebSocket.Server({ port: 8080 });

// 접속한 클라이언트들을 저장할 배열
let clients = [];

// 클라이언트 접속 시 이벤트 핸들러 등록
server.on("connection", (socket) => {
  console.log("클라이언트가 접속했습니다.");

  // 새로운 클라이언트를 배열에 추가
  clients.push(socket);

  // 클라이언트로부터 메시지 수신 시 이벤트 핸들러 등록
  socket.on("message", (message) => {
    console.log(`클라이언트로부터 메시지 수신: ${message}`);

    // 모든 클라이언트에게 메시지 전송
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${message}`);
      }
    });
  });

  // 클라이언트 접속 종료 시 이벤트 핸들러 등록
  socket.on("close", () => {
    console.log("클라이언트 접속 종료");

    // 배열에서 해당 클라이언트 제거
    clients = clients.filter((client) => client !== socket);
  });
});
