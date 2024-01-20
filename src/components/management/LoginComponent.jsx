import { useContext, useEffect, useState } from "react";
import { useAuth } from "./security/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/styles.css'
import imglogin from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/img-login.svg'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/scss/styles.scss'
//import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/js/main.js'


export default function LoginComponent(){
    const [username, setUsername] = useState('')
    const [user_password, setUser_Password] = useState('')

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()
    const authContext = useAuth();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setUser_Password(event.target.value);
    }

    useEffect(() => {
        if (authContext.isAuthenticated) {
          console.log(authContext.isAuthenticated);
          // ... Xử lý sau khi xác thực thành công
        }
      }, [authContext.isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json'
          },
          // body là cái phần dữ liệu nhập vào, rùi gửi tới localhost thông qua POST
          body: JSON.stringify({username, user_password})
        });
        
        if(response.ok) {
          const data = await response.json();
          authContext.login();
          
          if (data === 1) {
            // Admin
            navigate('/products');
          } else {
            // Regular user
            navigate('/main');
          }
    
        } else {
          setShowErrorMessage(true)
        }
    
      }

    return (
        <div class="login">
            <div class="login__content">
                <div class="login__img">
                    <img src={imglogin} alt=""/>
                </div>

                <div class="login__forms">
                    <form action="" class="login__registre" id="login-in">
                        <h1 class="login__title">Sign In</h1>
    
                        <div class="login__box">
                            <i class='bx bx-user login__icon'></i>
                            <input type="text" placeholder="Username" name="username" value={username} onChange={handleUsernameChange} class="login__input"/>
                        </div>
    
                        <div class="login__box">
                            <i class='bx bx-lock-alt login__icon'></i>
                            <input type="password" placeholder="Password" name="user_password" value={user_password} onChange={handlePasswordChange} class="login__input"/>
                        </div>

                        <a href="#" class="login__forgot">Forgot Password ?</a>

                        <a href="#" class="login__button" onClick={handleSubmit}>Đăng nhập</a>
                        {showErrorMessage && <div className="errorMessage" style={{marginBottom:'30px'}}>Authentication failed. Please check your credentials</div>}

                        <div>
                            <span class="login__account">Don't have an Account ?</span>
                            <span class="login__signin" id="sign-up"><Link className="nav-link" to="/register">Đăng ký ngay!</Link></span>
                        </div>
                    </form>

                    <form action="" class="login__create none" id="login-up">
                        <h1 class="login__title">Create Account</h1>
    
                        <div class="login__box">
                            <i class='bx bx-user login__icon'></i>
                            <input type="text" placeholder="Username" class="login__input"/>
                        </div>
    
                        <div class="login__box">
                            <i class='bx bx-at login__icon'></i>
                            <input type="text" placeholder="Email" class="login__input"/>
                        </div>

                        <div class="login__box">
                            <i class='bx bx-lock-alt login__icon'></i>
                            <input type="password" placeholder="Password" class="login__input"/>
                        </div>

                        <a href="#" class="login__button">Sign Up</a>

                        <div>
                            <span class="login__account">Already have an Account ?</span>
                            <span class="login__signup" id="sign-in">Sign In</span>
                        </div>

                        <div class="login__social">
                            <a href="#" class="login__social-icon"><i class='bx bxl-facebook' ></i></a>
                            <a href="#" class="login__social-icon"><i class='bx bxl-twitter' ></i></a>
                            <a href="#" class="login__social-icon"><i class='bx bxl-google' ></i></a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}