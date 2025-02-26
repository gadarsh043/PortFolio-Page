import * as Avatar from "@radix-ui/react-avatar";
import './scss/navbar.scss'
import * as Menubar from "@radix-ui/react-menubar";
import { useNavigate, useLocation } from 'react-router-dom';
import profilePic from '@/assets/my_dp.png'
import PropTypes from 'prop-types';
import lightModeIcon from '@/assets/light-mode2.png';
import darkModeIcon from '@/assets/dark-mode.png';

function Navbar({ appearance, toggleAppearance }) {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;
    const isDarkMode = appearance === 'dark';
    
    return (
        <div className="navbar">
            <div className="avatar">
                <Avatar.Root className="AvatarRoot" onClick={() => navigate('/')}>
                    <Avatar.Image
                        className="AvatarImage"
                        src={profilePic}
                        alt="G Adarsh Sonu"
                    />
                </Avatar.Root>
            </div>
            <div className="menu">
                <Menubar.Root className="MenubarRoot">
                    <Menubar.Menu>
                        <Menubar.Trigger className={`MenubarTrigger ${isActive('/') ? 'active' : ''}`} onClick={() => navigate('/')}>Home</Menubar.Trigger>|
                        <Menubar.Trigger className={`MenubarTrigger ${isActive('/resume') ? 'active' : ''}`} onClick={() => navigate('/resume')}>Resume</Menubar.Trigger>|
                        <Menubar.Trigger className={`MenubarTrigger ${isActive('/projects') ? 'active' : ''}`} onClick={() => navigate('/projects')}>Projects</Menubar.Trigger>|
                        <Menubar.Trigger className="MenubarTrigger" onClick={() => window.open('https://www.youtube.com/@g_adarsh_sonu', '_blank')}>
                            Youtube
                        </Menubar.Trigger>|
                        <Menubar.Trigger className={`MenubarTrigger ${isActive('/contact') ? 'active' : ''}`} onClick={() => navigate('/contact')}>Contact</Menubar.Trigger>
                    </Menubar.Menu>
                </Menubar.Root>
            </div>
            {location.pathname === '/'
                ? null
                : 
                <div className="toggleAppearance" onClick={() => toggleAppearance(isDarkMode ? 'light' : 'dark')}>
                    <div className={`themeToggleSwitch ${isDarkMode ? 'dark' : 'light'}`}>
                        <img 
                            src={isDarkMode ? darkModeIcon : lightModeIcon} 
                            alt={isDarkMode ? "Dark Mode" : "Light Mode"} 
                            className="themeIcon"
                        />
                    </div>
                </div>
            }
        </div>
    )
}

Navbar.propTypes = {
    appearance: PropTypes.string,
    toggleAppearance: PropTypes.func
};

export default Navbar;