import * as Avatar from "@radix-ui/react-avatar";
import './scss/navbar.scss'
import * as Menubar from "@radix-ui/react-menubar";

function Navbar() {
    return (
        <div className="navbar">
            <div className="avatar">
                <Avatar.Root className="AvatarRoot">
                    <Avatar.Image
                        className="AvatarImage"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv1xcrJic5LJxi8p22eNZ77EYppTjTxRkSBA&s"
                        alt="G Adarsh Sonu"
                    />
                </Avatar.Root>
            </div>
            <div className="menu">
                <Menubar.Root className="MenubarRoot">
                    <Menubar.Menu>
                        <Menubar.Trigger className="MenubarTrigger">Home</Menubar.Trigger>|
                        <Menubar.Trigger className="MenubarTrigger">Blogs</Menubar.Trigger>
                    </Menubar.Menu>
                </Menubar.Root>
            </div>
        </div>
    )
}
export default Navbar;