import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SocialSearch ({ users, viewUser, setViewUser }) {
    const [inputText, setInputText] = useState('')
    const navigate = useNavigate()

    const inputHandler = (e) => {
        const lowerCase = e.target.value.toLowerCase()
        setInputText(lowerCase)
    }

    const filteredUsers = users.filter((user) => {
        if (inputText === '') {
          return user
        } else {
          return user.name.toLowerCase().includes(inputText)
        }
      })

    return (
        <div className='social-list-container'>
            <div className='user-search-container'>
                <input className="user-search" placeholder='Search Users' onChange={inputHandler} />
            </div>
            {
                users ? 
                <div className="social-list" style={{ visibility: inputText ? 'visible' : 'hidden' }}>
                    <ul>
                        {
                            filteredUsers.map((user) => {
                                return (
                                <li className='user-search-item' key={user._id} onClick={() => {
                                    setViewUser(user)
                                    navigate(`/${user._id}`)
                                    }}>
                                  <div className='outer-user-search-item'>
                                    <div className="user-search-img-outer">
                                        <img className="user-search-profile-pic" src={user.profilePic} />
                                    </div>
                                    <div className="user-search-name-outer">
                                        {user.name}
                                    </div>
                                  </div>
                                </li>
                                )
                            })
                        }
                    </ul>
                </div>
                : ''
            }
        </div>
    )
}
