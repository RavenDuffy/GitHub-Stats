const sProt = window.location.protocol === 'https' ? 'wss:' : 'ws:'
const sURL = `${sProt}//${window.location.hostname}:4005/update_token/`
export const socket = new WebSocket(sURL)