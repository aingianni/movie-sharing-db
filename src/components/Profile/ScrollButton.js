import { useState } from 'react'
import Social from '../Social/Social'

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
      behavior: 'auto'
    })
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <>
      <button onClick={scrollToBottom} className='user-search-button'>Search For Users</button>
    </>
  )
}
