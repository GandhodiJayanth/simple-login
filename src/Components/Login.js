import axios from 'axios';
import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState({});
    const [isError, setIsError] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    const handleClick = async(e) => {
        e.preventDefault();
          setIsLoading(true);
         try{
            const {data} = await axios.get("https://jsonplaceholder.typicode.com/users/1")
            setUsers(data)
         }catch{
            setIsError(true);
         }
         setIsLoading(false);
    }

  return (
    <div className='contianer'>
        <h1>Login Page...</h1>
        <span>{users.name}</span>
        <form>
            <input type="text" placeholder='username' value={username} onChange={e => setUsername(e.target.value)}/>
            <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)}/>
            <button disabled={!username || !password} onClick={handleClick}>{isloading ? "Please wait..." : "Login" }</button>
            <span data-testid="error" style={{visibility: isError ? "visible" : "hidden"}}>Something went wrong ...</span>
        </form>
    </div>
  )
}

export default Login
