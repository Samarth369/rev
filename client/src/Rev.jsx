import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import '../style/rev.css'

export default function Rev () {

    const { id } = useParams();

    const divref = useRef()

    const [ html , sethtml ] = useState()

    useEffect( () => {
        fetch('http://localhost:3000/getrev' , {
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())
        .then(res => {
            let content = res.htmlcontent
            divref.current.innerHTML = content
        })
    } , [])


    function Content () {
        return (
            <>
            <div ref={divref}>
                {html}
            </div>
            </>
        )
    }


    function formsub (e) {
        e.preventDefault()
        console.log(e.target);
    }


    return (
        <>
        <div className="revpageg">
        <form onSubmit={formsub}>
            <Content />
            <div className="revbtn"><button>Send</button></div>
        </form>
        </div>
        </>
    )
}