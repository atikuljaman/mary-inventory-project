import React from 'react'

import './chat.css'
import { Link } from 'react-router-dom'
const ChatStart = ({ isAdmin }) => {




    return (
        <div className='chat_starter'>

            <div className='chat_starter_content'>
                {
                    isAdmin ? <h1>Get In Touch with <Link to='/chat/start'>Employees</Link></h1> : <h1>Get In Touch with <Link to='/chat/start'>Employers</Link> </h1>
                }

            </div>

        </div>
    )
}

export default ChatStart