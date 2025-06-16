import { Link, Navigate, useNavigate } from "react-router-dom";
import "./HeaderComponent.css";
import { useContext } from "react";
import { UserContext } from "../context/user.context";

function HeaderComponent(props) {
  const navega = useNavigate();
  const { user, setUser, logout } = useContext(UserContext);
  const { greetings, links } = props;

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navega("/");
    }
  };
  //Previo al ultimo cambio
  return (
    <header className="header">
      <h1 className="title">{greetings}</h1>
      <nav className="">
        <ul className="header-list">
          {/* Siempre visible */}
          <li>
            <Link to="/" className="link">
              {links.home}
            </Link>
          </li>

          {/* Enlaces ancla si están definidos */}
          {links.rallyPhotos && (
            <li>
              <a href="#rally-photos" className="link">
                {links.rallyPhotos}
              </a>
            </li>
          )}
          {links.votedPhotos && (
            <li>
              <a href="#voted-photos" className="link">
                {links.votedPhotos}
              </a>
            </li>
          )}
          {links.results && (
            <li>
              <a href="#rally-results" className="link">
                {links.results}
              </a>
            </li>
          )}

          {/* Otros links si no estás en RallyPage */}
          {!links.rallyPhotos && (
            <>
              <li>
                <a href="#" className="link">
                  {links.contact}
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  {links.blog}
                </a>
              </li>
            </>
          )}

          {/* Registro / Login / Logout */}
          {!user?.isLoggedIn && (
            <li>
              <Link to="/register" className="link">
                {links.register}
              </Link>
            </li>
          )}

          {user?.isLoggedIn && (
            <li>
              {user.role === "administrador" ? (
                <Link to="/dashboard" className="link">
                  Página personal
                </Link>
              ) : (
                <Link to={`/user/${user.id}`} className="link">
                  Página personal
                </Link>
              )}
            </li>
          )}

          {!user?.isLoggedIn && (
            <li>
              <Link to="/login" className="link">
                {links.login}
              </Link>
            </li>
          )}

          {user?.isLoggedIn && (
            <li>
              <Link to="/" className="link" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
        </ul>

        {/*
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
                {!user?.isLoggedIn && (
                    <li className="">
                        < Link to='/register' className='link'>{links.register}</Link>  
                    </li>
                )}

                {user?.isLoggedIn && (
                    (user.role == 'administrador' ? (<Link to='/dashboard'>Página personal</Link>) :
                
                    ( <Link to={`/user/${user?.id}`} className='link'>Página personal</Link>)
                )
                   
                )}
                
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
            */}
      </nav>
    </header>
  );
}

export default HeaderComponent;
