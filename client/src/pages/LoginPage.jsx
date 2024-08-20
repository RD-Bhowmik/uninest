import { Link, Navigate } from "react-router-dom";
import Header from "../Header";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[redirect, setRedirect] = useState(false); 
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev){
     ev.preventDefault();
     try {
        const {data} = await axios.post('/login', {email, password});
        setUser(data);
        alert('Login Successfull');
        setRedirect(true);
     } catch (e) {
        alert ('Login Failed');
     }
    
    }
    if (redirect) {
        return <Navigate to={'/'}/>
    }
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-20">
            <h1 className="text-4xl text-center mb-4">Login</h1> 
            <form className="max-w-md mx-auto border" onSubmit={handleLoginSubmit}>
                <input type="email" 
                    placeholder="******@email.com" 
                    value={email} 
                    onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)}/>
                <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't Have an Account Yet??    
                        <Link className="underline" to={"/register"} >Register Now</Link>
                    </div>
            </form>
            </div>
            </div>
    );
}