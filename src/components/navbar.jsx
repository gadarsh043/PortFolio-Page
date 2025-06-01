import * as Avatar from "@radix-ui/react-avatar";
import './scss/navbar.scss'
import * as Menubar from "@radix-ui/react-menubar";
import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import profilePic from '@/assets/my_dp.png'
import PropTypes from 'prop-types';
import lightModeIcon from '@/assets/light-mode2.png';
import darkModeIcon from '@/assets/dark-mode.png';
import hamburger from '@/assets/hamburger.png'
import close from '@/assets/close.png'
import { trackNavigation, trackButtonClick, trackUserInteraction } from '@/utils/analytics';

function Navbar({ appearance, toggleAppearance, isMobile }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;
    const isDarkMode = appearance === 'dark';

    const handleNavigation = (path, pageName) => {
        trackNavigation(location.pathname, path, 'navbar_click');
        trackButtonClick(pageName, 'navbar');
        navigate(path);
        if (isMobile) setMenuOpen(false);
    };

    const handleExternalLink = (url, linkName) => {
        trackButtonClick(linkName, 'navbar', { 
            external_url: url,
            link_type: 'external' 
        });
        trackUserInteraction('external_link_click', linkName, { url });
        window.open(url, '_blank');
    };

    const handleThemeToggle = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        trackUserInteraction('theme_toggle', `${appearance}_to_${newTheme}`, {
            from_theme: appearance,
            to_theme: newTheme,
            device_type: isMobile ? 'mobile' : 'desktop'
        });
        toggleAppearance(newTheme);
    };

    const handleMenuToggle = (action) => {
        trackUserInteraction('mobile_menu', action);
        setMenuOpen(action === 'open');
    };

    const handleAvatarClick = () => {
        trackNavigation(location.pathname, '/', 'avatar_click');
        trackButtonClick('Avatar/Logo', 'navbar');
        navigate('/');
    };
    
    return (
        <div className={`navbar ${isMobile ? "mweb" : ""}`}>
            {isMobile && (
                <img 
                    src={hamburger}
                    alt="open Menu"
                    className="mweb_menu"
                    onClick={() => handleMenuToggle('open')}
                />
            )}
            {isMobile && menuOpen && (
                <div className="mobileMenu">
                    <img
                        src={close}
                        alt="Close Menu"
                        className="closeMenu"
                        onClick={() => handleMenuToggle('close')}
                    />
                    <Menubar.Root className="MenubarRoot">
                        <Menubar.Menu>
                            <Menubar.Trigger className={`MenubarTrigger ${isActive("/") ? "active" : ""}`} onClick={() => handleNavigation("/", "Home")}>Home</Menubar.Trigger>
                            <Menubar.Trigger className={`MenubarTrigger ${isActive("/resume") ? "active" : ""}`} onClick={() => handleNavigation("/resume", "Resume")}>Resume</Menubar.Trigger>
                            <Menubar.Trigger className={`MenubarTrigger ${isActive("/projects") ? "active" : ""}`} onClick={() => handleNavigation("/projects", "Projects")}>Projects</Menubar.Trigger>
                            <Menubar.Trigger className="MenubarTrigger" onClick={() => handleExternalLink("https://www.youtube.com/@g_adarsh_sonu", "YouTube")}>YouTube</Menubar.Trigger>
                            <Menubar.Trigger className={`MenubarTrigger ${isActive("/contact") ? "active" : ""}`} onClick={() => handleNavigation("/contact", "Contact")}>Contact</Menubar.Trigger>
                        </Menubar.Menu>
                    </Menubar.Root>
                </div>
            )}
            <div className="avatar">
                <Avatar.Root className="AvatarRoot" onClick={handleAvatarClick}>
                    <Avatar.Image
                        className="AvatarImage"
                        src={profilePic}
                        alt="G Adarsh Sonu"
                    />
                </Avatar.Root>
            </div>
            {!isMobile && (
                <div className="menu">
                    <Menubar.Root className="MenubarRoot">
                        <Menubar.Menu>
                            <Menubar.Trigger className={`MenubarTrigger ${isActive('/') ? 'active' : ''}`} onClick={() => handleNavigation('/', 'Home')}>Home</Menubar.Trigger>|
                            <Menubar.Trigger className={`MenubarTrigger ${isActive('/resume') ? 'active' : ''}`} onClick={() => handleNavigation('/resume', 'Resume')}>Resume</Menubar.Trigger>|
                            <Menubar.Trigger className={`MenubarTrigger ${isActive('/projects') ? 'active' : ''}`} onClick={() => handleNavigation('/projects', 'Projects')}>Projects</Menubar.Trigger>|
                            <Menubar.Trigger className="MenubarTrigger" onClick={() => handleExternalLink('https://www.youtube.com/@g_adarsh_sonu', 'YouTube')}>
                                Youtube
                            </Menubar.Trigger>|
                            <Menubar.Trigger className={`MenubarTrigger ${isActive('/contact') ? 'active' : ''}`} onClick={() => handleNavigation('/contact', 'Contact')}>Contact</Menubar.Trigger>
                        </Menubar.Menu>
                    </Menubar.Root>
                </div>
            )}
            {location.pathname === '/'
                ? null
                : (
                    !isMobile ? 
                        <>
                            <div className="toggleAppearance" onClick={handleThemeToggle}>
                                <div className={`themeToggleSwitch ${isDarkMode ? 'dark' : 'light'}`}>
                                    <img 
                                        src={isDarkMode ? darkModeIcon : lightModeIcon} 
                                        alt={isDarkMode ? "Dark Mode" : "Light Mode"} 
                                        className="themeIcon"
                                    />
                                </div>
                            </div>
                        </>
                    : null
                )
            }
        </div>
    )
}

Navbar.propTypes = {
    appearance: PropTypes.string,
    toggleAppearance: PropTypes.func,
    isMobile: PropTypes.bool
};

export default Navbar;