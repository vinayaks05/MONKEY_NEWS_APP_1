import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function SignUp(){

    //const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    //const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const REGISTER_URL = 'http://localhost:5000/signup';
    
    const userRef = React.useRef();
    const errRef = React.useRef();
    const navigate = useNavigate()
    const [user, setUser] = React.useState('');
    

    const [pwd, setPwd] = React.useState('');
    

    const [errMsg, setErrMsg] = React.useState('');
    const [success, setSuccess] = React.useState(false);


    React.useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL,
                { Username: user, Password: pwd }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            navigate('/login')
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
        }
    }
    return(
    <div className="signup">
            {success ? (
                <section>
                    <h1>Success!</h1>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />


                        <label htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <p id="uidnote" className={"instructions"}>
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                            
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        <button className="submit-btn">Sign Up</button>
                    </form>
                </section>
            )}
    </div>
    );
}