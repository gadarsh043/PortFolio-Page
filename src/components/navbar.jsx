import * as Avatar from "@radix-ui/react-avatar";
import './scss/navbar.scss'
import * as Menubar from "@radix-ui/react-menubar";
import { useNavigate, useLocation } from 'react-router-dom';
import profilePic from '@/assets/my_dp.png'

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;
    
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
        </div>
    )
}
export default Navbar;