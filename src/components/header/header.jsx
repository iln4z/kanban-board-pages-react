import React, { useState } from 'react';
import '../../App.css';
import UserAvatar from './user-avatar.svg';
import ArrowDown from './arrow-down.svg';
import ArrowUp from './arrow-up.svg'

function Header() {
    const [isOpen, setOpen] = useState(false);
    return (
        <header className="header">
            <nav className='nav-header'>
                <ul className='nav-ul'>
                    <li className='app-logo' ><a href="/">Awesome Kanban Board</a></li>
                    <li className='user-menu'>
                        <button className='btn-nav' onClick={() => setOpen(!isOpen)}>
                            <img className="avatar" src={UserAvatar} alt="аватар" width="40" height="40" />
                            <img className="menu" src={isOpen ? ArrowUp : ArrowDown} alt="стрелка" />

                        </button>
                        <nav className={`drop-menu ${isOpen ? 'active' : ""}`}>
                            <li className='drop-item'>Profile</li>
                            <li className='drop-item'>Log Out</li>
                        </nav>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;  