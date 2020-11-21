import { useState } from 'react'
import Router from 'next/router';

const Register = () => {

  const [signupError, setSignupError] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [message, setMessage] = useState('');


  function handleSubmit(e) {

    e.preventDefault();
    fetch(process.env.API_REST + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X_SITE_API_KEY': process.env.X_SITE_API_KEY
      },
      body: JSON.stringify({
        email: email,
        name: name,
        phone: phone,
        document: document
      }),
      json: true
    })
      .then(async(response) => {
        const data = await response.json();
        if(data && data.error){
          setMessage('');
          if(typeof data.error === 'string')
            setSignupError(data.error)
          else
            Object.keys(data.error).map(key => 
              {
                setSignupError(data.error[key][0])
              }
            )
        }

          
        if (data && data.token) {
          //set cookie
          console.log(data);
          localStorage.setItem('token', data.token);
          // Router.push('/');
          setMessage('Register success');
          setSignupError('');
        }

      })
  }

  return (
  <div className="main">
    <div className="container ">
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>

      <div className="form-group">
          <label>Name</label>
          <input type="text" 
           value={name}
           onChange={(e) => setName(e.target.value)}
           className="form-control" required placeholder="Name" />
      </div>

      <div className="form-group">
          <label>Document</label>
          <input type="text" 
           value={document}
           onChange={(e) => setDocument(e.target.value)}
          className="form-control" required placeholder="Document" />
      </div>

      <div className="form-group">
          <label>Phone</label>
          <input type="text" 
           value={phone}
           onChange={(e) => setPhone(e.target.value)}
          className="form-control" required placeholder="Phone" />
      </div>

      <div className="form-group">
          <label>Email</label>
          <input type="email"  
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          className="form-control" required placeholder="Email" />
      </div>

      <button type='submit' className="btn btn-primary btn-block">Register</button>
      <br/>
      {signupError && <p className="text-center" style={{color: 'red'}}>{signupError}</p>}
      {message && <p className="text-center" style={{color: 'green'}}>{message}</p>}

      <a href="/" className="card">
        <h3>Home &rarr;</h3>
      </a>

      </form>
      </div>

    </div>
    
  )
}

export default Register