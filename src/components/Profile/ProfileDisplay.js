import { useState } from 'react'

export default function ProfileDisplay ({ user, movies }) {
  return (
    <>
      <div id='profile-img'>
        <img src='https://i.imgur.com/oQqn29n.jpg' />
      </div>

      <div id='profile-stats'>
        <ul>
          <li>Favorite Director</li>
          <li>Favorite Genre</li>
          <li>Total Runtime</li>
        </ul>
      </div>

      <div id='profile-log-out'>
        <button>Log Out</button>
      </div>
    </>
  )
}
