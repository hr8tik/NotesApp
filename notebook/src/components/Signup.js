import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import './Stylings/SignUp.css'

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name:'',email:'',password:'',cpassword:''})
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',


        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({ name:credentials.name,email:credentials.email, password:credentials.password })


    });
    const json = await response.json();
    console.log(json);
      if(json.success){
        localStorage.clear();
       localStorage.setItem('token',json.authtoken)
       
       props.showAlert("Account created Successfully","success")
       navigate('/login');
      }
      else{
        props.showAlert("Invalid Credentials","danger")
      }
     
}

const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
}
  return (
    <>
    <div className='container w-50  signupbg'>
      <h3>Sign Up</h3>
    <form className='signupForm' onSubmit={handleSubmit}>
    <div className="form-group my-3">
    <label className='label  font-weight-bold' htmlFor="name">Name</label>
    <input type="text" className="form-control  signupInput" id="name" aria-describedby="emailHelp" name="name" onChange={onChange} placeholder="Enter Enter Name"/>
  </div>
  <div className="form-group my-3">
    <label  className='label font-weight-bold' htmlFor="email ">Email address</label>
    <input type="email " className="form-control signupInput" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email"/>
  </div>
  <div className="form-group my-3">
    <label className="label font-weight-bold" htmlFor="password">Password</label>
    <input type="password" className="form-control signupInput" name="password" id="password" onChange={onChange} placeholder="Password" minLength={5} required />
  </div>
    <div className='d-flex flex-column align-items-center justify-content-center'>
  <button type="submit" className="btn  btn-primary d-flex flex-row align-items-center justify-content-center ">Submit</button>
  </div>
</form>
</div>
    </>

  )
}

export default Signup