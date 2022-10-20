const socket = io('http://localhost:3000/');

const messageInput = document.querySelector('#message');
const roomInput = document.querySelector('#roomInput');
const nicknameInput = document.querySelector('#nickname');
const roomTitle = document.getElementById('room');

let id = '';
let roomName = '';

socket.on('connect', () => {
    id = socket.io.engine.id;
});
socket.on('msg', (data) => {
    showMessage(data);
});

function setRoom() {
    roomName = roomInput.value;
    roomTitle.innerHTML = `Sala: ${roomName}`;
    socket.emit('room', roomName);
}

function showMessage(data) {
    let msgDiv = document.querySelector('#messages');
    const date = new Date();
    msgDiv.innerHTML += `
    <div class="message">
       [${date.toLocaleTimeString()}] <span>${data}</span>
    </div>
    `;
}

function sendSocketMessage() {
    const message = messageInput.value;
    socket.emit('msg', { room: roomName, message: message });
}
