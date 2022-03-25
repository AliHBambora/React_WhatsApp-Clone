import React from 'react'
import './Message.css'
import { useStateValue } from './StateProvider';
function Message({name,msgBody,timestamp}) {

    const [{user},dispatch] = useStateValue();
    return (
        <div className={`message ${name == user.displayName && 'receiver'}`}>
            <span className='message_senderName'>{name}</span> 
            <p className="message__body">{msgBody}</p>
            <p className="message__time">{timestamp}</p>
        </div>
    )
}

export default Message;
