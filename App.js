import './App.css';
import {useState, useEffect} from 'react';

function App() {

const initialValues = {username : "", email : "", password : ""}

const[formValues, setFormValues] = useState(initialValues);
const[formErrors, setFormErros] = useState("");
const[isSubmit, setisSubmit] = useState(false);

const handleChange=(e)=>{
  const{name, value} = e.target;
  setFormValues({...formValues, [name]:value});
};

const handleSubmit=(e)=>{
  e.preventDefault();
  setFormErros(validate(formValues));
  setisSubmit(true);
};

useEffect(() => {
  console.log(formErrors);
  if (Object.keys(formErrors).length === 0 && isSubmit) {
    console.log(formValues);
  }
}, [formErrors]);

const validate =(values)=>{
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!values.username) {
    errors.username = "Username is required!";
  }
  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values.password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }
  return errors;
};

  return (
    <div className="App">

    {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

    <div className="box">
    
      <form className="form" onSubmit={handleSubmit}>

        <label  className="label">User Name</label>
        <input
          type="text"
          placeholder="username"
          name="username"
          className="Input"
          value={formValues.username}
          onChange={handleChange}
        />
        <p>{formErrors.username}</p>

        <label className="label"> email</label>
        <input
          type="text"
          placeholder="email"
          name="email"
          className="Input"
          value={formValues.email}
          onChange={handleChange}
        />
        <p>{formErrors.email}</p>

        <label  className="label">password</label>
        <input
          type="text"
          placeholder="password"
          name="password"
          className="Input"
          value={formValues.password}
          onChange={handleChange}
        />
         <p>{formErrors.password}</p>
        <button className="button">Submit</button>
      </form>
      </div>
    </div>
  );
}

export default App;
