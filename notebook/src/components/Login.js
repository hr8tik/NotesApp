import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import './Stylings/Login.css'


const Login = (props) => {

 const [credentials, setcredentials] = useState({email:'',password:''})
 const navigate = useNavigate();
    const handleSubmit = async (e) => {
        console.log("Hrithik")
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',


            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ email:credentials.email, password:credentials.password })


        });
        const json = await response.json();
        console.log(json);
        if(json.success){
           localStorage.setItem('token',json.authtoken)
           props.showAlert("Logged In ","success")
           navigate('/');
        }
        else{
            props.showAlert("Ibnvalid creds","danger")
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
  
    return (
        <> <div className='d-flex flex-column align-items-center justify-content-center'>
           <div className='w-50 loginbg  ' >
            <h3>Login</h3>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3    ">
                    <label htmlFor="email" className=" form-label">Email address</label>
                    <input type="email" className="  form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                  
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                <button type="submit" className="btn btn-primary d-flex align-items-center justify-content-center  ">Submit</button>
                </div>
            </form>

        </div>
        </div>
        </>
    )
}

export default Login