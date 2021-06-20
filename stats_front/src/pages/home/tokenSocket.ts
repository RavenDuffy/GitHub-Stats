const sProt = window.location.protocol === 'https' ? 'wss:' : 'ws:'
const sURL = `${sProt}//${window.location.hostname}:4010`
export const socket = new WebSocket(sURL)