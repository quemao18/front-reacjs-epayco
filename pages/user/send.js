import { useState } from 'react'
import Router from 'next/router';

const Balance = () => {

  const [signupError, setSignupError] = useState('');
  const [signupErrorToken, setSignupErrorToken] = useState('');

  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [messageToken, setMessageToken] = useState('');
  const [phone, setPhone] = useState('');
  const [document, setDocument] = useState('');
  const [token, setToken] = useState('');


  function handleSubmit(e) {

    e.preventDefault();
    fetch(process.env.API_REST + '/wallet/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X_SITE_API_KEY': process.env.X_SITE_API_KEY,
        'X_SITE_AUTH_TOKEN': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        phone: phone,
        document: document,
        amount: amount
      }),
      json: true
    })
      .then(async(response) => {
        const data = await response.json();
        if (data && data.error) {
          if(typeof data.error === 'string')
            setSignupError(data.error)
          else
            Object.keys(data.error).map(key => 
              {
                setSignupError(data.error[key][0])
              }
            )

          }
          
          if (data && data.balance) {
            //set cookie
            setSignupError('')
            if(data.mail)
              setMessage(data.mail)
            // setBalance(data.balance)
          }

      })
  }


  function handleTokenSubmit(e) {

    e.preventDefault();
    fetch(process.env.API_REST + '/wallet/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X_SITE_API_KEY': process.env.X_SITE_API_KEY,
      },
      body: JSON.stringify({
        token: token
      }),
      json: true
    })
      .then(async(response) => {
        const data = await response.json();
          if (data && data.error) {
            setSignupErrorToken(data.error)
            setBalance('')
          }
          
          if (data) {
            //set cookie
            setSignupErrorToken('')
            setMessageToken(data.success)
            // Router.push('/');
            
          }

      })
  }

  return (
  <div className="main">
    <div className="container ">
    <form >
      <h3>Send Money</h3>

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
          <label>Amount</label>
          <input type="number" 
           value={amount}
           onChange={(e) => setAmount(e.target.value)}
          className="form-control" required placeholder="Amount" />
      </div>
      <button type='button'  onClick={handleSubmit} className="btn btn-primary btn-block">Send</button>
      <br/>
      {signupError && <p className="text-center" style={{color: 'red'}}>{signupError}</p>}
      {message && <p className="text-center" style={{color: 'green'}}>{message}</p>}

      {/* {balance && <p className="text-center" style={{color: 'green'}}>Your Balance is: {balance}</p>} */}

      <hr/>
      <div className="form-group">
          <label>Token Email</label>
          <input type="text" 
           value={token}
           onChange={(e) => setToken(e.target.value)}
          className="form-control" required placeholder="Token" />
      </div>

      <button type='button' disabled={!token} onClick={handleTokenSubmit} className="btn btn-primary btn-block">Confirm</button>
      <br/>

      {signupErrorToken && <p className="text-center" style={{color: 'red'}}>{signupErrorToken}</p>}
      {messageToken && <p className="text-center" style={{color: 'green'}}>{messageToken}</p>}


      <br/>

      <a href="/" className="card">
        <h3>Home &rarr;</h3>
      </a>

      </form>
      </div>

    </div>
    
  )
}

export default Balance