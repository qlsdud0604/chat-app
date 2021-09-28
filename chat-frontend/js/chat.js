let username = prompt("아이디를 입력하세요.");
let roomNum = prompt("채팅방 번호를 입력하세요.");

document.querySelector("#username").innerHTML = username;

//----------------------------------------------------------------------

/* SSE 프로토콜 연결 */
const eventSource = new EventSource(
  `http://localhost:8080/chat/roomNum/${roomNum}`
);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.sender === username) {
    loadMyMessage(data);
  } else {
    loadYourMessage(data);
  }
};

//----------------------------------------------------------------------

/* 메시지 전송자의 메시지 박스 */
function senderMsgBox(data) {
  let md = data.createdAt.substring(5, 10);
  let tm = data.createdAt.substring(11, 16);
  convertTime = md + " " + tm;

  return `<div class="sent_msg">
    <p>${data.msg}</p>
    <span class="time_date">${convertTime} - <b>${data.sender}</b></span>
</div>`;
}

/* 메시지 수진자의 메시지 박스 */
function receiverMsgBox(data) {
  let md = data.createdAt.substring(5, 10);
  let tm = data.createdAt.substring(11, 16);
  convertTime = md + " " + tm;

  return `<div class="received_withd_msg">
    <p>${data.msg}</p>
    <span class="time_date">${convertTime} - <b>${data.sender}</b></span> 
</div>`;
}

//----------------------------------------------------------------------

/* 데이터베이스의 전송자 채팅 내역을 로드하는 메서드 */
function loadMyMessage(data) {
  let chatBox = document.querySelector("#chat-box");

  let sendBox = document.createElement("div");
  sendBox.className = "outgoing_msg";

  sendBox.innerHTML = senderMsgBox(data);

  chatBox.append(sendBox);

  document.documentElement.scrollTop = document.body.scrollHeight;
}

/* 데이터베이스의 수신자 채팅 내역을 로드하는 메서드 */
function loadYourMessage(data) {
  let chatBox = document.querySelector("#chat-box");

  let receivedBox = document.createElement("div");
  receivedBox.className = "received_msg";

  receivedBox.innerHTML = receiverMsgBox(data);

  chatBox.append(receivedBox);

  document.documentElement.scrollTop = document.body.scrollHeight;
}

//----------------------------------------------------------------------

/* 입력한 메시지를 전송하는 메서드 */
async function sendMessage() {
  let msgInput = document.querySelector("#chat-outgoing-msg");

  let chat = {
    sender: username,
    roomNum: roomNum,
    msg: msgInput.value,
  };

  fetch("http://localhost:8080/chat", {
    method: "post",
    body: JSON.stringify(chat), // JS -> JSON으로 변경
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  msgInput.value = "";
}

//----------------------------------------------------------------------

/* 메시지 창 엔터 키보드 동작 정의 */
document
  .querySelector("#chat-outgoing-msg")
  .addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  });

/* 메세지 전송 버튼 동작 정의 */
document
  .querySelector("#chat-outgoing-button")
  .addEventListener("click", () => {
    sendMessage();
  });
