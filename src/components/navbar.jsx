import emprlogo from '../resources/logo.png';
import "../css/Navbar.css"

export default function Navbar()
{
    return <nav className="nav">
        <a href="/" className="site-name">
            EmpRoster
            <img className="logo-holder" src={emprlogo} alt="logo"></img>
        </a>
        <ul>
            <li>
                <a href="/login">Login</a>
            </li>
            <li>
                {/*TODO: Link to create account page when made*/}
                <a href="/login">Create</a>
            </li>
        </ul>
    </nav>
}