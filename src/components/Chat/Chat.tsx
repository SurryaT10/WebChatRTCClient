import React, { MouseEvent, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import './Chat.css'
import SideBar from '../SideBar/SideBar';
import Messages from '../Messages/Messages';
import { socket } from '../../socket';
import { MessagesProps, User } from '../../custom_types';

function Chat() {
    const location = useLocation();
    const { userName, roomName }: { userName: string, roomName: string } = location.state ?? {};
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState<MessagesProps[]>([]);
    const [ users, setUsers ] = useState<User[]>([]);

    useEffect(() => {
        socket.emit('join', { userName, roomName }, async (error: string) => {
            if (error) {
                alert(error);
            } else {
                console.log('joined');
            }
        });
        
        const handleNewMessage = (message: MessagesProps) => {
            if (userName === message.userName) message.userName = 'You';
            setMessages((prevMessages) => [
                ...prevMessages,
                message
            ]);
        };

        const handleRoomData = (roomData: { users: User[] }) => {
            setUsers(roomData.users);
        };

        socket.on('message', handleNewMessage);
        socket.on('roomData', handleRoomData);

        return () => {
            socket.off('message', handleNewMessage);
            socket.off('roomData', handleRoomData);
        }
      }, [message, users, roomName, userName]);

    const sendMessage = (event: MouseEvent) => {
        event.preventDefault();
        socket.emit('sendMessage', message, () => {
            setMessage('');
        });
    }

    const getLocation = () => {
        if (!navigator.geolocation) {
            return { message: "Geolocation is not supported for your browser" };
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            socket.emit('shareGeolocation', location, () => {
                console.log("Location shared!");
            });
        });
    }

    return (
        <div className='chat'>
            <SideBar roomData={{ roomName, users }} />
            <div className='chat__main'>
                <Messages messages={messages} />
                <div className='compose'>
                    <form id="message-form">
                        <input onChange={(e) => setMessage(e.target.value)} value={message} name="message" type="text" placeholder="Message" />
                        <button onClick={(e) => sendMessage(e)} className='btn'>send</button>
                    </form>
                    <button onClick={getLocation} className='btn' id="share-location">share location</button>
                </div>
                
            </div>
        </div>
    )
}

export default Chat