function getMsg(msg) {
  return `<div class="sent_msg">
    <p>${msg}</p>
    <span class="time_date"> 11:18 | Today</span>
</div>`;
}

/* 메시지 창 엔터 키보드 동작 정의 */
document
  .querySelector("#chat-outgoing-msg")
  .addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      let chatBox = document.querySelector("#chat-box");

      let msgInput = document.querySelector("#chat-outgoing-msg");

      let chatOutgoingBox = document.createElement("div");
      chatOutgoingBox.className = "outgoing_msg";
      chatOutgoingBox.innerHTML = getMsg(msgInput.value);

      chatBox.append(chatOutgoingBox);

      msgInput.value = "";
    }
  });

/* 메세지 전송 버튼 동작 정의 */
document
  .querySelector("#chat-outgoing-button")
  .addEventListener("click", () => {
    let chatBox = document.querySelector("#chat-box");

    let msgInput = document.querySelector("#chat-outgoing-msg");

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";
    chatOutgoingBox.innerHTML = getMsg(msgInput.value);

    chatBox.append(chatOutgoingBox);

    msgInput.value = "";
  });
