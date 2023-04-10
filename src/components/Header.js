import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import logo from '../boutique_leloud.svg';

const Header = (props) => {
  const navigate = useNavigate();

  const navigateLogin = () => {
    let path = '/login';
    navigate(path);
  };

  const navigateSignup = () => {
    let path = '/register';
    navigate(path);
  };

  const navigateLogout = () => {
    console.log('Logout');
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/admin">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </Link>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
        {props.pages.map((i, key) => {
            if (i.type === 'start') {
              return (
                <div key={key} className="navbar-item">
                  <Link className="navbar-item" to={i.path}>
                    <strong>{i.name}</strong>
                  </Link>
                </div>
              );
            } else if (i.type === 'dropdown') {
              return (
                <div key={key} className="navbar-item">
                  <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">
                      <strong>{i.name}</strong>
                    </a>
                    <div className="navbar-dropdown">
                      {i.paths.map((i, key) => (
                        <Link key={key} className="navbar-item" to={i.path}>{i.name}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {!props.auth.isAuth ? (
              <>
                <Button className="is-primary" id="login" name="Login" type="button" onClick={navigateLogin} />
                <Button className="is-primary" id="sign-up" name="Signup" type="button" onClick={navigateSignup} />
              </>
            ) : (
              <Button className="is-primary" id="logout" name="Logout" type="button" onClick={navigateLogout} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;