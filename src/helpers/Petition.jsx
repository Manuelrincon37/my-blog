/* eslint-disable react-hooks/exhaustive-deps */

let loading = true

export const Petition = async (url, method, dataToSave = '', files = false) => {
  loading = true

  let options = { method: 'GET' }

  if (method === 'GET' || method === 'DELETE') {
    options = { method }
  }

  if (method === 'PUT' || method === 'POST') {
    if (files) {
      options = {
        method,
        body: dataToSave
      }
    } else {
      options = {
        method,
        body: JSON.stringify(dataToSave),
        headers: { 'Content-Type': 'application/json' }
      }
    }
  }
  const res = await fetch(url, options)
  const data = await res.json()

  loading = false

  return {
    data,
    loading
  }
}
