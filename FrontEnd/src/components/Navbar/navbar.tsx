import React, { useContext, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';  // Import your AuthContext

export default function Navbar() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate(); 

    // Safely access the context values by checking if authContext is not null
    if (!authContext) {
        return null;  // Handle the case when context is not available
    }

    const { isLoggedIn, setIsLoggedIn } = authContext;  // Now TypeScript knows authContext is not null

    const menu = useRef<Menu | null>(null);

    const avatarItems = isLoggedIn
        ? [
            { label: 'Profile', icon: 'pi pi-user' , command: ()=>  navigate('/profile')},
            { label: 'Logout', icon: 'pi pi-sign-out', command: () => handleLogout() }
          ]
        : [
            { label: 'Sign In', icon: 'pi pi-sign-in' , command: () => navigate('/signin')},
            { label: 'Sign Up', icon: 'pi pi-user-plus',  command: () => navigate('/signup')}
          ];

    const items = [
        { label: 'Home', icon: 'pi pi-home',command: () => navigate('/') },
        { label: 'Projects', icon: 'pi pi-search' },
        { label: 'About', icon: 'pi pi-star' },
        { label: 'Contact', icon: 'pi pi-envelope' }
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2" />;
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Avatar
                image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                shape="circle"
                style={{ cursor: 'pointer' }}
                onClick={(e) => menu.current?.toggle(e)}
            />
            <Menu model={avatarItems} popup ref={menu} />
        </div>
    );

    const handleLogout = () => {
        localStorage.clear();  // Remove token from localStorage
        setIsLoggedIn(false);             // Update isLoggedIn to false
        console.log('Logged out successfully');
    };

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    );
}
