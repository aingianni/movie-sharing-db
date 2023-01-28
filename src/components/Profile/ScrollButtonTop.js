import { useState } from 'react'

export default function ScrollButton () {
  const [visible, setVisible] = useState(true)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', toggleVisible)

  return (
    <>
      <button onClick={scrollToTop} className='scroll-top-button'>Back To Top</button>
    </>
  )
}