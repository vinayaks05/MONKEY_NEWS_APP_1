import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const LOGIN_URL = 'http://localhost:5000/login';
    
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
            const response = await axios.post(LOGIN_URL,
                { Username: user, Password: pwd }
            );
            console.log(response?.data);
            const Data = response?.data
            console.log("Data", Data)
            if (Data.status === "Loggedin"){
                window.localStorage.setItem("userInfo", Data.userInfo)
                setSuccess(true);
                navigate('/saved')
            }
            //console.log(response?.Username);
            //console.log(JSON.stringify(response))
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } 
            else {
                setErrMsg('Login Failed')
            }
        }
    }
    return(
    <div className="Login">
            {success ? (
                <section>
                    <h1>Success!</h1>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Login</h1>
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
                        <button className="login-btn">Login</button>
                    </form>
                </section>
            )}
    </div>
    );
}