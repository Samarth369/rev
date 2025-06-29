import { useEffect } from "react";
import "../style/dashboard.css";
import { useNavigate } from 'react-router-dom'

export default function Dashboard () {

    const navigate = useNavigate()

    useEffect(() => {
        let istoken = localStorage.getItem("Token")
        if(!istoken) {
            navigate('/')
        }        
    } , [])

    function Space () {
        return (
            <>
            <div className="space-block">
                <div className="space">
                    
                    <div className="spacebtn">
                        <h1>Space</h1>
                        <button onClick={() => {navigate('/createrev')}}>new Space</button>
                    </div>

                    <div className="spacespace">
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