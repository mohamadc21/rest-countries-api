import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {

    const [theme, setTheme] = useState('');

    useEffect(() => {
        setTheme(localStorage.getItem('theme'));
    }, [])

    function toggleTheme(e) {
        const theme = e.target;
        if(!theme.classList.contains('light')) {
            localStorage.setItem('theme', 'light');
        } else localStorage.setItem('theme', '');

        setTheme(localStorage.getItem('theme'));
    }

    return (
        <header className="top-header">
            <Link to='/'><h3>Where is the world?</h3></Link>
            <div className={`theme ${theme}`} onClick={toggleTheme}>
                <ion-icon name="moon"></ion-icon> Dark Mode
            </div>
        </header>
    )
}

export default Header;