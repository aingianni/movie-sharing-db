import { useState } from 'react'

export default function ScrollButton () {
  const [visible, setVisible] = useState(true)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 0) {
      setVisible(false)
    } else if (scrolled <= 0) {
      setVisible(true)
    }
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <>
      <button onClick={scrollToBottom} className='user-search-button'>Search For Users</button>
    </>
  )
}
