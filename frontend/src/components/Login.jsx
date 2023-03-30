import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom';  // used for redirecting the user

const Login = (props) => {

    let navigate = useNavigate();

    const [credentials,setCredentials] = useState({email:"",password:""})
    

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}), 
    
            });
            const json = await response.json();
            // console.log(json);
            if(json.success===true){
                // Save the auth token and redirect the user to the home route
                localStorage.setItem("token",json.authToken)
                props.showAlert("Logged In Successfully", "success")
                navigate("/");
            } 
            else{
                props.showAlert("Invalid Credentials", "danger")
            }

    }

    const handleChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }



  return (
    <div className='container my-5 rounded shadow-lg' style={{background:'#4C6793',color:'white' ,width:'500px' , height:'450px',padding:'30px'}}>
     <h2 className='text-center pt-4'>Login to E-Notebook</h2>
        
        <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
            <label htmlFor="email" className="form-label mt-3">Email address</label>
            <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={handleChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label mt-3">Password</label>
            <input type="password" className="form-control" id="password" value={credentials.password} onChange={handleChange} name='password'/>
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
        </form>
        
        <h6 className='my-5'>Don't have an account? <Link to="/signup" style={{color:'white'}}>Signup here</Link></h6>
    </div>
  )
}

export default Login
