const socket = io('http://showlink.herokuapp.com')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('You joined')
let toSend=Math.floor(Math.random() * (+999 - +1) + +1); 


socket.emit('new-user', {name,room:toSend})
appendMessage(` in room ${toSend}`)


socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message} in room ${toSend}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
 // appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value

  let toWhom=prompt('to Whom?')
  socket.emit('send-chat-message', {message,room:toWhom})
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}