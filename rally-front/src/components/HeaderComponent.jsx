import { Link, Navigate, useNavigate } from "react-router-dom"
import './HeaderComponent.css';
import { useContext } from "react";
import { UserContext } from "../context/user.context";

function HeaderComponent(props) {
    const navega = useNavigate();
    const {user, setUser, logout} = useContext(UserContext);
    const {greetings, links} = props;

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            navega('/');
        }
    };
  return (
    <header className="header">
        <h1 className="title">{greetings}</h1>
        <nav className="">
            <ul className="header-list">
                <li className="">
                    <Link to='/' className="link">{links.home}</Link>
                    
                </li>
                <li className="">
                    <a href="" className="link">{links.contact}</a>
                </li>
                <li className="">
                    <a href="" className="link">{links.blog}</a>
                </li>
                <li className="">
                    < Link to='/register' className='link'>{links.register}</Link>  
                </li>
                {!user?.isLoggedIn && (
                    <li className="">
                        < Link to='/login' className='link'>{links.login}</Link>  
                    </li>
                )}
                
                {user?.isLoggedIn && (
                    <li className="">
                        < Link to='/' className='link' onClick={handleLogout}>Logout</Link>  
                    </li>
                )}
                
            </ul>
        </nav>
    </header>
  )
}

export default HeaderComponent