import React from 'react'
import { User } from '../../custom_types'
import './SideBar.css'

interface SideBarProps {
    roomData: {
        roomName: string,
        users: User[]
    };
}

function SideBar({ roomData }: SideBarProps) {
    return (
        <div id='sidebar' className='chat__sidebar'>
            <h2 className='room-title'>{ roomData.roomName }</h2>
            <h3 className='list-title'>Users</h3>
            <ul className='users'>
                {
                    roomData.users?.map(user => <li key={user.id}>{ user.userName }</li>)
                }
            </ul>
        </div>
    )
}

export default SideBar