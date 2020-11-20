import { useState } from 'react'
import Router from 'next/router';

const Balance = () => {

  const [signupError, setSignupError] = useState('');
  const [balance, setBalance] = useState('');
  const [phone, setPhone] = useState('');
  const [document, setDocument] = useState('');

  function handleSubmit(e) {

    e.preventDefault();
    fetch(process.env.API_REST + '/balance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X_SITE_API_KEY': process.env.X_SITE_API_KEY
      },
      body: JSON.stringify({
        phone: phone,
        document: document
      }),
      json: true
    })
      .then(async(response) => {
        setSignupError('')

        const data = await response.json();
          if (data && data.error) {
            setSignupError(data.error)
            setBalance('')
          }

          setBalance('0')
          

          if(data.token)
          localStorage.setItem('token', data.token);
          
          if (data && data.balance) {
            //set cookie
            setBalance(data.balance)
          }

      })
  }

  return (
  <div className="main">
    <div className="container ">
    <form onSubmit={handleSubmit}>
      <h3>Balance</h3>

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

      <button type='submit' className="btn btn-primary btn-block">Mostrar</button>
      <br/>
      {signupError && <p className="text-center" style={{color: 'red'}}>{signupError}</p>}

      {balance && <p className="text-center" style={{color: 'green'}}>Your Balance is: {balance}</p>}

      <a href="/" className="card">
        <h3>Home &rarr;</h3>
      </a>


      </form>
      </div>

    </div>
    
  )
}

export default Balance