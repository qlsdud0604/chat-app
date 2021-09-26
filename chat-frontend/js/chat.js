function sendMsgBox(msg, time) {
  return `<div class="sent_msg">
    <p>${msg}</p>
    <span class="time_date">${time}</span>
</div>`;
}

/* 기존의 채팅 내역을 출력하는 메서드 */
function initMessage(data) {
  let chatBox = document.querySelector("#chat-box");

  let msgInput = document.querySelector("#chat-outgoing-msg");

  let chatOutgoingBox = document.createElement("div");
  chatOutgoingBox.className = "outgoing_msg";
  chatOutgoingBox.innerHTML = sendMsgBox(data.msg, data.createdAt);

  chatBox.append(chatOutgoingBox);

  msgInput.value = "";
}

/* 입력한 메시지를 전송하는 메서드 */
async function addMessage() {
  let chatBox = document.querySelector("#chat-box");

  let msgInput = document.querySelector("#chat-outgoing-msg");

  let chatOutgoingBox = document.createElement("div");
  chatOutgoingBox.className = "outgoing_msg";

  let date = new Date();
  let now =
    date.getHours() +
    ":" +
    date.getMinutes() +
    " | " +
    date.getMonth() +
    "월" +
    date.getDate() +
    "일";

  let chat = {
    sender: "ssar",
    receiver: "cos",
    msg: msgInput.value,
  };

  let response = await fetch("http://localhost:8080/chat", {
    method: "post",
    body: JSON.stringify(chat), // JS -> JSON으로 변경
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  console.log(response);

  let parseResponse = response.json();

  console.log(parseResponse);

  chatOutgoingBox.innerHTML = sendMsgBox(msgInput.value, now);

  chatBox.append(chatOutgoingBox);

  msgInput.value = "";
}

/* 메시지 창 엔터 키보드 동작 정의 */
document
  .querySelector("#chat-outgoing-msg")
  .addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      addMessage();
    }
  });

/* 메세지 전송 버튼 동작 정의 */
document
  .querySelector("#chat-outgoing-button")
  .addEventListener("click", () => {
    addMessage();
  });
