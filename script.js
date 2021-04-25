//definimos donde va a alojarse el servidor
const socket = io('http://localhost:3000')
//el elemento HTMl
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
/*Abstraer el input en el HTML */
const messageInput = document.getElementById('message-input')

const name = prompt('Cual es tu nombre?')
appendMessage('Has ingresado')

//podemos ver que encaja con lo definido en el server para cuando ingresa
// un usuario
socket.emit('new-user', name)

/*Esto es para enviar el mensaje, este metodo hace match con el definido
  en el lado del servidor */
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

/*Para cuando se conecta un nuevo usuario */
socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

/* */
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}