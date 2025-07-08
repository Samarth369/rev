import { useEffect } from "react";
import "../style/dashboard.css";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";

export default function Dashboard () {

    const navigate = useNavigate()

    const [ list , setlist ] = useState([])

    useEffect(() => {
        let istoken = localStorage.getItem("Token")
        if(!istoken) {
            navigate('/')
        }

        fetch('http://localhost:3000/dash' , {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                token: localStorage.getItem("Token")
            })})
            .then( res => res.json() )
            .then(res => {
                setlist(res.link)
            })
    } , [])

    function Space () {
        return (
            <>
            <div className="space-block">
                <div className="space">
                    
                    <div className="spacebtn">
                        <h1>Space</h1>
                        <button onClick={() => {navigate('/createrev')}}>new Space</button>
                        <button onClick={() => {
                            localStorage.removeItem("Token")
                            navigate('/')
                        }}>Log out</button>
                    </div>


                    <div className="spacespace">
                        <ul>
                            {list.map( ( x , idx ) => {
                                
                                return (
                                    <>
                                    <li>
                                        <div>
                                            <div className="space-name">{x[1]}</div>
                                            <div className="link-space">
                                                <div className="link"><a href={`http://localhost:5173/rev/${x[0]}`}>http://localhost:5173/rev/{x[0]}</a></div>

                                                <button onClick={ () => {
                                                    navigate('/state' , {state: x})
                                                }}>States</button>

                                                <button onClick={ async () => {
                                                    fetch("http://localhost:3000/delrev" , {
                                                        method:"POST",
                                                        headers: {
                                                            "Content-Type" : "application/json"
                                                        },
                                                        body: JSON.stringify({
                                                            id: x
                                                        })
                                                    })

                                                    let newlist = list.filter((_, i) => i !== idx);
                                                    setlist(newlist)
                                                }}>Del</button>
                                            </div>
                                        </div>
                                    </li>
                                    </>
                                )
                            })}
                        </ul>
                    </div>

                </div>
            </div>
            </>
        )
    }

    return (
        <>
        <div className="dsb-main">
            <Space />
        </div>
        </>
    )
}