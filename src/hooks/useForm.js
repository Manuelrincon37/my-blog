import { useState } from 'react'
export const useForm = (initialState = {}) => {
  const [form, setForm] = useState(initialState)

  const serializeFomr = (form) => {
    const formData = new FormData(form)

    const data = {}

    for (const [name, value] of formData) {
      data[name] = value
    }
    return data
  }
  const sent = (e) => {
    e.preventDefault()

    const course = serializeFomr(e.target)
    setForm(course)
  }
  const change = ({ target }) => {
    const { name, value } = target
    setForm({
      ...form,
      [name]: value
    })
  }
  return {
    form,
    sent,
    change
  }
}
