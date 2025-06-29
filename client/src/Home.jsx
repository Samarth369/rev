import { useState } from 'react'
import '../style/home.css'
import { useNavigate } from "react-router-dom"

export default function Home () {

    const navigate = useNavigate()

    const [ userin , setuserin ] = useState(true);

    function Login () {

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
                localStorage.setItem("Token" , res.token)
            })
        }

        return (
            <>
            <form onSubmit={login}>
            <div className="login">
                <h1>Login</h1>

                <div className="username">
                    Username : <input type="text" name='username'/>
                </div>

                <div className="password">
                    Password : <input type="password" name='password'/>
                </div>

                <button onClick={() => {navigate('/createrev')}}>login</button>
                
                <div className="link" onClick={() => setuserin(x => !x)}><h1>Signup here</h1></div>
            </div>
            </form>
            </>
        )
    }

    function Signup () {

        function signup (e) {
            e.preventDefault()
            let formdata = new FormData(e.target)

            let username = formdata.get("username")
            let password = formdata.get("password")
            let email = formdata.get("mail")

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
                console.log(res);
            })
        }

        return (
            <>
            <form onSubmit={signup}>
            <div className="login">
                <h1>Signup</h1>
                
                <div className="mail">
                    E-mail : <input type="email" name="mail" />
                </div>

                <div className="username">
                    Username : <input type="text" name='username'/>
                </div>

                <div className="password">
                    Password : <input type="password" name='password'/>
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