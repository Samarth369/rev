import { useState } from "react";
import "../style/createrev.css";

export default function Createrev() {
    const [lists, setlists] = useState([]);

    return (
        <>
            <div className="createrev-block">
                <form className="createrev">
                    <div className="livepage">
                        <div className="mainpage">
                            <div className="img-block">
                                <img
                                    src="https://testimonial.to/static/media/just-logo.040f4fd2.svg"
                                    alt=""
                                    width={110}
                                />
                            </div>

                            <div className="header-block">
                                <h1 className="header">here is your header</h1>
                            </div>

                            <div className="mess-block">here is your mess...</div>

                            <div className="ques">
                                QUESTIONS
                                <ul className="ulist">
                                    <li>
                                        1qwe1qwe1qwe1qwe1qwe1qwe1qwe1qwe1qwe1qwe1qwe1qwe1qwe1qwe
                                    </li>
                                    <li>2qwe</li>
                                    <li>3qwe</li>
                                </ul>
                            </div>

                            <div className="rev-btn">
                                <button type="button">Record a video</button>
                                <button type="button">Send text</button>
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
                                <input type="text" />
                            </div>
                        </div>


                        <div className="spacelogo">
                            <div className="spacelogo-in">
                                <label htmlFor="logo">
                                    <div className="logodiv">Space logo</div>
                                </label>
                                <input type="file" name="logo" id="logo" />
                            </div>
                        </div>


                        <div className="headertitle">
                            <div className="headertitle-in">
                                Header tite
                                <input type="text" />
                            </div>
                        </div>


                        <div className="cmess">
                            <div className="cmess-in">
                                Your custom message
                                <textarea name="custommessage" id="custommessage"></textarea>
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
                                    <div className="chose1  opti"><input type="checkbox" /> Name </div>    
                                    <div className="chose2  opti"><input type="checkbox" /> Email </div>    
                                    <div className="chose3  opti"><input type="checkbox" /> Social link </div>    
                                    <div className="chose4  opti"><input type="checkbox" /> Address </div>    
                                </div>
                            </div>
                        </div>


                        <div className="createspacebtn">
                            <button type="button">Create Space</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
