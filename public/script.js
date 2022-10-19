const socket = io('http://localhost:3000/');

const messageInput = document.querySelector('#message');
const roomInput = document.querySelector('#room');
const nicknameInput = document.querySelector('#nickname');

let id = '';

socket.on('connect', () => {
    id = socket.io.engine.id;
});
socket.on('msg', (data) => {
    showMessage(data);
});

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
    const data = messageInput.value;
    socket.emit('msg', data);
}
