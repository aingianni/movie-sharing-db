import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SocialSearch ({ users, viewUser, setViewUser }) {
    const [inputText, setInputText] = useState('')
    const [visible, setVisible] = useState('hidden')

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

    const navigate = useNavigate()

    return (
        <div>
            <div>
                <input placeholder='Search Users' onChange={inputHandler} />
            </div>
            {
                users ? 
                <div className="social-list" style={{ visibility: inputText ? 'visible' : 'hidden' }}>
                    <ul>
                        {
                            filteredUsers.map((user) => {
                                return (
                                <li key={user._id} onClick={() => {
                                    setViewUser(user)
                                    navigate(`/${user._id}`)
                                    }}>{user.name}</li>
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
