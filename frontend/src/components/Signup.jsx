import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';

const Signup = (props) => {

    const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();

    const handleChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();

        const {name,email,password, cpassword} = credentials;  // cpassword will not be used in authentication and will only check the password

        if(password!==cpassword){
            props.showAlert("The Passwords Do Not Match", "danger")
        }
        else{
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST", 
                
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name,email,password}), 
        
                });
                const json = await response.json();
                // console.log(json);
                if(json.success===true){
                    // Save the auth token and redirect the user to the home route
                    localStorage.setItem("token",json.authToken)
                    navigate("/");
                    props.showAlert("Account Created Successfully", "success")

                } 
                else{
                    props.showAlert("Invalid Details", "danger")
                }

        }
    }


  return (
    <div className='container my-5 rounded shadow-lg' style={{background:'#4C6793', color:'white' , width:'540px' , height:'520px'}}>
    <h2 className='my-4 pt-4 text-center '>Signup to E-Notebook</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input style={{width:'470px', margin:'auto'}} type="text" className="form-control mb-3" id="name" onChange={handleChange} name="name" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input style={{width:'470px', margin:'auto'}} type="email" className="form-control mb-3" id="email" onChange={handleChange} name="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input style={{width:'470px', margin:'auto'}} type="password" className="form-control mb-3" onChange={handleChange} name="password" id="password" required minLength={5} />
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input style={{width:'470px', margin:'auto'}} type="password" className="form-control mb-3" onChange={handleChange} name="cpassword" id="cpassword" required minLength={5} />
        </div>
        <button type="submit" className="btn btn-primary ">Signup</button>
        </form>
        <h6 className='my-3' style={{color:'white'}}>Already have an account? <Link style={{color:'white'}} to="/login">Login here</Link></h6>

    </div>
  )
}

export default Signup
