import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, useParams } from 'react-router-dom';

import '../style/rev.css'

export default function Rev () {

    const { id } = useParams();

    const divref = useRef()

    const [ html , sethtml ] = useState()

    function imgurl ( dp ) {
        let imgurl = `data:${dp[0]};base64,${dp[1]}`
        divref.current.children[0].children[0].src = imgurl
        divref.current.children[0].children[0].width = '300'
        divref.current.children[0].style.height = "auto"
    }

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
            imgurl(res.dp)
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
        let formdata = new FormData(e.target)
        formdata.append("id",id)

        fetch("http://localhost:3000/revresponce" , {
            method:"POST",
            body: formdata
        })
    }


    return (
        <>
        <div className="revpageg">
        <form onSubmit={formsub} encType="multipart/form-data">
            <Content />
            <div className="revbtn"><button onClick={() => {
                alert("Thank you for responce")
            }}
            >Send</button></div>
        </form>
        </div>
        </>
    )
}