function sendMsgBox(msg, time) {
  return `<div class="sent_msg">
    <p>${msg}</p>
    <span class="time_date">${time}</span>
</div>`;
}

/* 채팅방의 메시지를 초기화하는 메서드 */
function initMessage(data) {
  let chatBox = document.querySelector("#chat-box");

  let msgInput = document.querySelector("#chat-outgoing-msg");

  let chatOutgoingBox = document.createElement("div");
  chatOutgoingBox.className = "outgoing_msg";
  chatOutgoingBox.innerHTML = sendMsgBox(data.msg);

  chatBox.append(chatOutgoingBox);

  msgInput.value = "";
}

/* 메시지 창의 메시지를 추가하는 메서드 */
function addMessage() {
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
