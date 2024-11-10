import React, { useContext, useEffect, useRef, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';  // Import your AuthContext
import { getAllDocsByUserId } from '../../services/docsService';


interface Document {
    _id: string;
    title: string;
  }

  
export default function Navbar() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate(); 

    // Safely access the context values by checking if authContext is not null
    if (!authContext) {
        return null;  // Handle the case when context is not available
    }

    const { isLoggedIn, setIsLoggedIn } = authContext;  // Now TypeScript knows authContext is not null

    const menu = useRef<Menu | null>(null);
    const [searchValue, setSearchValue] = useState('');
    // const [documents, setDocuments] = useState<any[]>([]);
    const [filteredItems, setFilteredItems] = useState<{ label: string, value: string }[]>([]);

    // api call to bring the docs from the bakend 
    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const userData = localStorage.getItem('user');
                if (userData) {
                    const user = JSON.parse(userData);
                    if (user && user.id) {
                        const userId = user.id;
                        const docs = await getAllDocsByUserId(userId);
                        // Convert docs into { label: title, value: _id }
                        setFilteredItems(docs.all_docs.map((doc: Document) => ({
                            label: doc.title, // For display
                            value: doc._id    // For use when clicked
                        })));
                    }
                }
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };

        fetchDocs();
    }, []);
      

    const searchItems = (event: { query: string }) => {
        // Filter items based on the query input
        const filtered = filteredItems.filter((doc) =>
            doc.label.toLowerCase().includes(event.query.toLowerCase())
        );
        setFilteredItems(filtered);
    };
    const handleSuggestionClick = (docId: string) => {
        navigate(`/document/${docId}`);
    };


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
        { label: 'All docs', icon: 'pi pi-search', command: () => navigate('/alldocs') },
        { label: 'About', icon: 'pi pi-star' , command: () => navigate('/about')},
        { label: 'Contact', icon: 'pi pi-envelope' }
    ];

    const start = <img alt="logo" src="src/logo.png" height="40" className="mr-2" />;
    const end = (
        <div className="flex align-items-center gap-2">
            <AutoComplete
                value={searchValue}
                suggestions={filteredItems}
                completeMethod={searchItems}  // Search logic
                field="label"                // Tells AutoComplete to display `label` (title)
                placeholder="Search"
                className="w-8rem sm:w-auto"
                onChange={(e) => {
                    console.log(filteredItems);  // Log the value whenever it changes
                    setSearchValue(e.value);  // Update the search value
                }}
                // Updates the search value
                onSelect={(e) => {
                    console.log('Item selected:', e.value);  // Check what the value is when you select an item
                
                    const actual_id = filteredItems.find(item => item.value === e.value.value);  // Find the correct item based on value
                    console.log('Found actual_id:', actual_id);  // Log the entire item
                
                    if (actual_id) {
                        navigate(`/document/${actual_id.value}`);  // Navigate to the document
                    }
                }}
                
            />

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
