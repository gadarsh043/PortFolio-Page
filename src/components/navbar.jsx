import * as Avatar from "@radix-ui/react-avatar";
import './scss/navbar.scss'
import * as Menubar from "@radix-ui/react-menubar";
import { useNavigate } from 'react-router-dom';
import profilePic from '@/assets/my_dp.png'

function Navbar() {
    const navigate = useNavigate();
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
                        <Menubar.Trigger className="MenubarTrigger" onClick={() => navigate('/')}>Home</Menubar.Trigger>|
                        <Menubar.Trigger className="MenubarTrigger" onClick={() => navigate('/resume')}>Resume</Menubar.Trigger>|
                        <Menubar.Trigger className="MenubarTrigger" onClick={() => navigate('/works')}>Works</Menubar.Trigger>|
                        <Menubar.Trigger className="MenubarTrigger" onClick={() => window.open('https://www.youtube.com/@g_adarsh_sonu', '_blank')}>
                            Youtube
                        </Menubar.Trigger>|
                        <Menubar.Trigger className="MenubarTrigger" onClick={() => navigate('/contact')}>Contact</Menubar.Trigger>
                    </Menubar.Menu>
                </Menubar.Root>
            </div>
        </div>
    )
}
export default Navbar;