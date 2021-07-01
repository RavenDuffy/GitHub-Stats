const sProt = process.env.NODE_ENV === 'production' ? 'wss' : 'ws'
const sURL = `${sProt}://${window.location.hostname}:4010`
const socket = new WebSocket(sURL)

export default socket