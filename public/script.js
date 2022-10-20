const socket = io('http://localhost:3000/');

const messageInput = document.querySelector('#messageInput');
const roomInput = document.querySelector('#roomInput');
const nicknameInput = document.querySelector('#nicknameInput');
const roomTitle = document.getElementById('room');

let id = '';
let roomName = '';
let nickname = '';

socket.on('connect', () => {
    id = socket.io.engine.id;
});

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
    let msgDiv = document.querySelector('#messages');
    const date = new Date();
    msgDiv.innerHTML += `
    <div class="message">
       [${date.toLocaleTimeString()}] <span>${data.nickname}:</span> <span>${
        data.message
    }</span>
    </div>
    `;
}

function sendSocketMessage() {
    const message = messageInput.value;
    socket.emit('msg', { room: roomName, message, nickname });
}

document
    .getElementById('messageInput')
    .addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendSocketMessage();
            event.target.value = '';
        }
    });
