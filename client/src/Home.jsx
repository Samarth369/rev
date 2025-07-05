import { useState } from 'react'
import '../style/home.css'
import { useNavigate } from "react-router-dom"
import { useRef } from 'react';

export default function Home () {

    const navigate = useNavigate()

    const [ userin , setuserin ] = useState(true);

    
    function Login () {
        const usernameref = useRef()
        const passref = useRef()

        function wun () {
            usernameref.current.style.border = "2px solid red";
            usernameref.current.value = "user not found";
        }

        function wpass () {
            passref.current.style.border = "2px solid red";
        }

        function login (e) {
            e.preventDefault()
            let formdata = new FormData(e.target)

            let username = formdata.get("username")
            let password = formdata.get("password")
            
            
            fetch('http://localhost:3000/login' , {
                method: "POST",
                
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(res => {
                return res.json()
            })
            .then(res => {                
                if ( res.res == "no user found") {
                    wun()
                } else if ( res.res == "password is wrong" ) {
                    wpass()
                }
                if (res.token) {
                    localStorage.setItem("Token" , res.token)
                    navigate('/dashboard')
                }
            })
        }

        return (
            <>
            <form onSubmit={login}>
            <div className="login">
                <h1>Login</h1>

                <div className="username">
                    Username : <input type="text" ref={usernameref} onFocus={(e) => {e.target.style.border = "1px solid gray"}} name='username'/>
                </div>

                <div className="password">
                    Password : <input type="password" ref={passref} onFocus={(e) => {e.target.style.border = "1px solid gray"}} name='password'/>
                </div>

                <button onClick={() => {}} >login</button>
                
                <div className="link" onClick={() => setuserin(x => !x)}><h1>Signup here</h1></div>
            </div>
            </form>
            </>
        )
    }

    function Signup () {
        const mailref = useRef()
        const usernameref = useRef()
        const passref = useRef()



        function signup (e) {
            e.preventDefault()
            let formdata = new FormData(e.target)

            let email = formdata.get("mail")
            let username = formdata.get("username")
            let password = formdata.get("password")

            function ei () {
                mailref.current.style.border = "2px solid red"
            }

            function change_user_name () {
                usernameref.current.style.border = "2px solid red"
            }

            if ( password.length > 8 ) {
                fetch('http://localhost:3000/signup' , {
                method: "POST",
                
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email
                })
            })
            .then(res => {                
                return res.json()
            })
            .then(res => {                
                if ( res.res == "use diffrent email" ) {
                    ei()
                } else if ( res.res == "use diffrent username" ) {
                    change_user_name()
                } else if ( res.res == "user got created" ) {
                    setuserin(true)
                }
            })
            } else {
                alert("Use strong password")
                passref.current.style.border = "2px solid red"
            }   

            
        }

        return (
            <>
            <form onSubmit={signup}>
            <div className="login">
                <h1>Signup</h1>
                
                <div className="mail">
                    E-mail : <input type="email" ref={mailref} onFocus={() => {mailref.current.style.border = "1px solid gray"}} name="mail" />
                </div>

                <div className="username">
                    Username : <input type="text" ref={usernameref} onFocus={() => {usernameref.current.style.border = "1px solid gray"}} name='username'/>
                </div>

                <div className="password">
                    Password : <input type="password" ref={passref} onFocus={() => {passref.current.style.border = "1px solid gray"}} name='password'/>
                </div>

                <button>Signup</button>

                <div className="link" onClick={() => setuserin(x => !x)}><h1>Login here</h1></div>
            </div>
            </form>
            </>
        )
    }

    return (
        <>
        <div className="main">
            <div className="heading">
                Get your <br />  Review,<br />    Testimonial
            </div>

            <div className="in">
                {userin ? <Login /> : <Signup />}
            </div>
        </div>
        </>
    )
}