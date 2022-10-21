const socket = io('http://localhost:3000/');

const messageInput = document.querySelector('#messageInput');
const roomInput = document.querySelector('#roomInput');
const nicknameInput = document.querySelector('#nicknameInput');
const roomTitle = document.getElementById('room');

let roomName = '';
let nickname = '';

function setNickname() {
    nickname = nicknameInput.value;
    nicknameInput.value = '';
}

function setRoom() {
    roomName = roomInput.value;
    roomTitle.innerHTML = `Room: ${roomName}`;
    socket.emit('room', roomName);
    roomInput.value = '';
}

socket.on('msg', (data) => {
    showMessage(data);
});

function showMessage(data) {
    const date = new Date();
    let message = document.createElement('div');
    message.classList.add('message');
    message.innerHTML += `
       [${date.toLocaleTimeString()}] <strong>${
        data.nickname
    }:</strong> <span>${data.message}</span>
    `;
    document.getElementById('messages_container').appendChild(message);
    document.getElementById('messages_container').scrollTop =
        message.offsetHeight + message.offsetTop;
}

function sendSocketMessage() {
    const message = messageInput.value;
    socket.emit('msg', { room: roomName, message, nickname });
}

messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendSocketMessage();
        event.target.value = '';
    }
});

roomInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        setRoom();
        event.target.value = '';
        messageInput.focus();
    }
});
nicknameInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        setNickname();
        event.target.value = '';
        roomInput.focus();
    }
});
