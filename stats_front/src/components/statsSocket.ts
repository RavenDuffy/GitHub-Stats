const sProt = window.location.protocol === 'https' ? 'wss' : 'ws'
const sURL = `${sProt}://${window.location.hostname}:4010`
const socket = new WebSocket(sURL)

export default socket