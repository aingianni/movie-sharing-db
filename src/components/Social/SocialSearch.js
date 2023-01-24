import { useState } from 'react'

export default function SocialSearch ({ users }) {
    const [inputText, setInputText] = useState('')
    const [visible, setVisible] = useState('hidden')

    const inputHandler = (e) => {
        const lowerCase = e.target.value.toLowerCase()
        setInputText(lowerCase)
    }

    console.log(inputText)
    console.log(visible)

    const filteredUsers = users.filter((user) => {
        if (inputText === '') {
          return user
        } else {
          return user.name.toLowerCase().includes(inputText)
        }
      })

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
                                <li key={user._id}>{user.name}</li>
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
