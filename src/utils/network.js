const parsePayload = resp => resp.target ? resp.target.response : resp

const sendGet = (url, data, callback) => {
  const tx = new XMLHttpRequest()
  const query = Object.entries(data).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')

  tx.open('GET', query ? `${url}?${query}` : url, true)
  tx.addEventListener('load', (resp) => callback(parsePayload(resp)), false)
  tx.onerror = (err) => callback({ error: err, status: tx.status })
  tx.send(null)
}

const sendPost = (url, data, callback) => {
  const tx = new XMLHttpRequest()

  tx.open('POST', url, true)
  tx.setRequestHeader('Content-Type', 'application/json')
  tx.addEventListener('load', (resp) => callback(parsePayload(resp)), false)
  tx.onerror = (err) => callback({ error: err, status: tx.status })
  tx.send(JSON.stringify(data))
}

const sendPatch = (url, data, callback) => {
  const tx = new XMLHttpRequest()

  tx.open('PATCH', url, true)
  tx.setRequestHeader('Content-Type', 'application/json')
  tx.addEventListener('load', (resp) => callback(parsePayload(resp)), false)
  tx.onerror = (err) => callback({ error: err, status: tx.status })
  tx.send(JSON.stringify(data))
}

const sendDelete = (url, data, callback) => {
  const tx = new XMLHttpRequest()

  tx.open('DELETE', url, true)
  tx.setRequestHeader('Content-Type', 'application/json')
  tx.addEventListener('load', (resp) => callback(parsePayload(resp)), false)
  tx.onerror = (err) => callback({ error: err, status: tx.status })
  tx.send(JSON.stringify(data))
}

export default {
  sendGet,
  sendPost,
  sendPatch,
  sendDelete
}