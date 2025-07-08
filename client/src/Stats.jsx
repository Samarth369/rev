import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import "../style/stats.css"
import { useEffect } from 'react';

export default function State () {

    const location = useLocation();
    const id = location.state;    

    const [ data , setdata ] = useState([])
    const [ imgshow , setimgshow ] = useState(false)
    const [ imgsrc , setimgsrc ] = useState()

    useEffect( () => {
        fetch("http://localhost:3000/getstates" , {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    token: localStorage.getItem("Token"),
                    revid: id 
            })
        })
        .then(res => res.json())
        .then(res => {            
        setdata(res.data)
    })
    } , [] )

    function Showimg () {
        return (
            <>
            {imgshow 
            &&
            <div className="show-img">
                <button onClick={() => {setimgshow(false)}}>Close</button>
                <img src={imgsrc} alt="" className='simg' />
            </div>
            }
            </>
        )
    }

    function setingimgURL (x) {
        const imgSrc = `data:${x[0]};base64,${x[1]}`
        setimgsrc(imgSrc)
    }

    return (
        <>
        <div className="state-bg">
            <div className="download-brn"><button>Download</button></div>
            <Showimg />
            <table className='state'>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>E mail</th>
                    <th>Social Links</th>
                    <th>Address</th>
                    <th>Img</th>
                </tr>
                </thead>

                <tbody>
                {data.map( x => {
                    return (
                        <>
                        <tr>
                            <td>{x.name}</td>
                            <td>{x.mail}</td>
                            <td>{x.sociallink}</td>
                            <td>{x.address}</td>
                            <td>{x.img ? <button className='img-btn' onClick={() => {
                                setimgshow(true)
                                setingimgURL(x.img)
                            }}>see img</button> : "no img"}</td>
                          </tr>
                        </>
                    )
                })}
                </tbody>

            </table>
        </div>
        </>
    )
}
