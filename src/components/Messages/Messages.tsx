import React from 'react'
import './Messages.css';
import { MessagesProps } from '../../custom_types';

interface AllMessages {
    messages: MessagesProps[];
}

function Messages({ messages }: AllMessages) {
    return (
        <div id="messages" className='chat__messages'>
            {
                messages?.map((message: MessagesProps, index) => {
                    const messageData = message.URL ? <a href={ message.URL }>I am here!</a> : <p>{message.text}</p>;
                    return <div key={index}>
                        <p>
                        <span className='message__name'>{message.userName}</span>
                        <span className='message__meta'>{message.createdAt}</span>
                        </p>
                        { messageData }
                    </div>
                    }
                )
            }
        </div>
    )
}

export default Messages