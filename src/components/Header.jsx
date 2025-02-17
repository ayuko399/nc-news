import { Link } from "react-router-dom";

function Header(){
    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="header-logo">
                    NC NEWS
                </Link>
                <nav className="nav-links">
                    <Link to="/">home</Link>
                    <Link to="/topics">topics</Link>
                    <Link to="/post">post</Link>
                    <Link to="/users">profile</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header