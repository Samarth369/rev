import { useState , useEffect} from "react";
import "../style/createrev.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Createrev() {

    const navigate = useNavigate()

    const [ header , setheader ] = useState("")
    const [ mess , setmess ] = useState('')

    // Ques
    const [ spacename , setspacename ] = useState("") 
    const [ name , setname ] = useState(false) 
    const [ email , setemail ] = useState(false) 
    const [ link , setlink ] = useState(false) 
    const [ address , setaddress ] = useState(false) 

    const [lists, setlists] = useState([]);
 
    const liveref = useRef()

    useEffect(() => {
            let istoken = localStorage.getItem("Token")
            
            if(!istoken) {
                navigate('/')
            }

            let asd = localStorage.getItem('Token')
        } , [])

        function formsub (e) {
            e.preventDefault()
        }
        
        function createrev () {
        fetch("http://localhost:3000/createrev" , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                livepage: liveref.current.innerHTML,
                spacename: spacename,
                token: localStorage.getItem("Token"),
            })
        })
        .then(res => res.json()).then(res => console.log(res))
    }
    

    return (
        <>
            <div className="createrev-block">
                <form className="createrev" encType="multipart/form-data" onSubmit={formsub}>
                    <div className="livepage" >
                        <div className="mainpage" ref={liveref}>
                            

                            <div className="header-block">
                                <h1 className="header">{header == "" ? "here is your header" : header}</h1>
                            </div>

                            <div className="mess-block">{mess == '' ? "here is your message..." : mess}</div>

                            <div className="ques">
                                {lists.length != 0 && 'QUESTIONS'}
                                <ul className="ulist">
                                    {lists.map(x => <li>{x}</li>)}
                                </ul>
                            </div>

                            {name &&
                            <div className="optio">
                                <div className="optio-in">
                                    Name <input type="text" />
                                </div>
                            </div>}


                            {email &&
                            <div className="optio">
                                <div className="optio-in">
                                    Email <input type="text" />
                                </div>
                            </div>}


                            {link &&
                            <div className="optio">
                                <div className="optio-in">
                                    Social link <input type="text" />
                                </div>
                            </div>}


                            {address &&
                            <div className="optio">
                                <div className="optio-in">
                                    Address <input type="text" />
                                </div>
                            </div>}


                            <div className="rev-btn">
                                
                                <label htmlFor="videorev">
                                    <div>Record Video</div>
                                </label>
                                    <input type="file" name="videorev" id="videorev" />

                                <label htmlFor="photorev">
                                    <div>Upload Photo</div>
                                </label>
                                    <input type="file" name="photorev" id="photorev" />

                            </div>
                        </div>
                    </div>

                    <div className="costom">


                        <div className="createspace">
                            <h1>Create Space</h1>
                        </div>


                        <div className="spacename">
                            <div className="spacename-in">
                                Space name
                                <input type="text" onChange={(e) => {setspacename(e.target.value)}}/>
                            </div>
                        </div>


                        <div className="headertitle">
                            <div className="headertitle-in">
                                Header tite
                                <input type="text" onChange={(e) => {
                                    setheader(e.target.value);
                                }}/>
                            </div>
                        </div>


                        <div className="cmess">
                            <div className="cmess-in">
                                Your custom message
                                <textarea name="custommessage" id="custommessage" onChange={(e) => {
                                    setmess(e.target.value);
                                }}></textarea>
                            </div>
                        </div>


                        <div className="que">
                            <div className="que-in">
                                Questions
                                <ul>
                                    {lists.map((x, idx) => (
                                        <li className="Question" key={idx}>
                                            <input
                                                type="text"
                                                value={x}
                                                onChange={(e) => {
                                                    const newArr = [...lists];
                                                    newArr[idx] = e.target.value;
                                                    setlists(newArr);
                                                }}
                                            />
                                            <span
                                                className="material-symbols-outlined"
                                                onClick={() => {
                                                    const newArr = lists.filter(
                                                        (_, index) => index !== idx
                                                    );
                                                    setlists(newArr);
                                                }}
                                            >
                                                delete
                                            </span>
                                        </li>
                                    ))}
                                </ul>


                                <div className="addlist">
                                    {!(lists.length == 5) && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (lists.length < 5) {
                                                    setlists((x) => [...x, ""]);
                                                }
                                            }}
                                        >
                                            Add list
                                        </button>
                                    )}
                                </div>

                            </div>
                        </div>


                        <div className="cinfo">
                            <div className="cinfo-in">
                                Collect extra information
                                <div className="chose">
                                    <div className="chose1  opti"><input type="checkbox" onChange={(e) => {
                                        setname(e.target.checked);
                                    }}/> Name </div>

                                    <div className="chose2  opti"><input type="checkbox" onChange={(e) => {
                                        setemail(e.target.checked);
                                    }}/> Email </div>

                                    <div className="chose3  opti"><input type="checkbox" onChange={(e) => {
                                        setlink(e.target.checked);
                                    }}/> Social link </div>

                                    <div className="chose4  opti"><input type="checkbox" onChange={(e) => {
                                        setaddress(e.target.checked);
                                    }}/> Address </div>

                                </div>
                            </div>
                        </div>


                        <div className="createspacebtn">
                            <button onClick={createrev} type="button">Create Space</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
