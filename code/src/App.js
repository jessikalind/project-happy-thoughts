import React, { useState, useEffect } from 'react'
import SendMessage from './Components/SendMessage'
import ShowMessage from './Components/ShowMessage'

const api = 'https://happy-thoughts-technigo.herokuapp.com/thoughts'

export const App = () => {
  const [showMessage, setShowMessage] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchMessages = () => {
    setLoading(false)
    fetch(api)
      .then((res) => res.json())
      .then((data) => setShowMessage(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchMessages()
  }, [newMessage])

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: newMessage
      })
    }

    fetch(api, options)
      .then((res) => res.json())
      .then(() => fetchMessages())
      .finally(() => setNewMessage(''))
  }

  return (
    <div className="outer-wrapper">
      <div className="inner-wrapper">
        <SendMessage
          newMessage={newMessage}
          handleNewMessageChange={handleNewMessageChange}
          onFormSubmit={onFormSubmit} />
        {showMessage.map((message) => (
          <ShowMessage key={message._id} message={message.message} />
        ))}
      </div>
    </div>
  )
}
