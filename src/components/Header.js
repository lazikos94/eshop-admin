import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
    let navigate = useNavigate();

    const navigateLogin=()=>{
        let path='login';
        navigate(path)
    }

    const navigateSignup=()=>{
        let path='register';
        navigate(path)
    }

    const navigateLogout=()=>{
        console.log('Logout')
    }

    return ( 
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
                </a>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
                {
                    props.pages.map((i,key)=>{
                        if(i.type=='start'){
                            return( <div className="navbar-item">
                                    <a className="navbar-item" href={i.path}>
                                    <strong>{i.name}</strong>
                                    </a>
                                    </div>)
                        }else if(i.type='dropdown'){
                            return(
                                <div className="navbar-item">
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                <strong>{i.name}</strong>
                                </a>
                                <div className="navbar-dropdown">
                                    {i.paths.map((i,key)=>{
                                        return(<>
                                            <a className="navbar-item" href={i.path}>{i.name}</a>
                                            </>
                                        )
                                    })}

                                </div>
                            </div>
                            </div>)  
                        }                     
                    })
                }
                </div>
            </div>
          
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                    {!props.auth.isAuth?<>
                        <Button className={'is-primary'} id={'login'} name={'Login'} type={'button'} onClick={navigateLogin}/>
                        <Button className={'is-primary'} id={'sign-up'} name={'Signup'} type={'button'} onClick={navigateSignup}/></>:
                        <Button className={'is-primary'} id={'logout'} name={'Logout'} type={'button'} onClick={navigateLogout}/>
                        }
                    </div>
                </div>
            </div>
      </nav>
    );
}
 
export default Header;