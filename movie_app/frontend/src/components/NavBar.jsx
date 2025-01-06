import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Poți face brand-ul un div clicabil */}
      <div className="navbar-brand" onClick={() => navigate("/")}>
        Movie App
      </div>

      {/* Sau poți lăsa brand-ul ca Link spre root */}
      {/* 
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      */}

      <div className="navbar-links">
        {/* Link normal către root pentru Home */}
        <Link to="/" className="nav-link">
          Home
        </Link>
        {/* Link către pagina de Favorites */}
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
