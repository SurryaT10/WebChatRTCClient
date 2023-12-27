import { MouseEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { socket } from '../../socket';
import './Login.css'

function Login() {
    const [ userName, setUserName ] = useState('');
    const [ roomName, setRoomName ] = useState('');
    const navigate = useNavigate()

    const joinChat = async () => {
        socket.emit('join', { userName, roomName }, async (error: string) => {
            if (error) {
                alert(error);
            } else {
                await navigate('/chat', { state: { userName, roomName }});
            }
        });
    }

    const handleClick = (event: MouseEvent) => {
        event.preventDefault(); // Prevent the default Link behavior
        joinChat();
    };

    const JoinLink = () => userName && roomName ? <Link to='/chat' className='btn' onClick={(e) => handleClick(e)}>Join</Link> : <button className="btn" disabled>Join</button>;

    return (
        <div className='centered-form'>
            <div className='centered-form__box'>
                <h1>Join</h1>
                <form>
                    <label>Display name</label>
                    <input type='text' name='username' onChange={(e) => setUserName(e.target.value)} placeholder='Display name' required />
                    <label>Room</label>
                    <input type='text' name='room' onChange={(e) => setRoomName(e.target.value)} placeholder='room' required />
                    { JoinLink() }                            
                </form>
            </div>
        </div>
    )
}

export default Login