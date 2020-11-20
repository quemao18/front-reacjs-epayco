import { useState } from 'react'
import Router from 'next/router';

const Balance = () => {

  const [signupError, setSignupError] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('');
  const [phone, setPhone] = useState('');
  const [document, setDocument] = useState('');

  function handleSubmit(e) {

    e.preventDefault();
    fetch(process.env.API_REST + '/wallet/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X_SITE_API_KEY': process.env.X_SITE_API_KEY,
      },
      body: JSON.stringify({
        phone: phone,
        document: document,
        amount: amount,
      }),
      json: true
    })
      .then(async(response) => {
        const data = await response.json();
          if (data && data.error) {
            setSignupError(data.error)
            setBalance('')
          }
          
          if (data && data.balance) {
            //set cookie
            setSignupError('')
            setBalance(data.balance)

          }

      })
  }

  return (
  <div className="main">
    <div className="container ">
    <form onSubmit={handleSubmit}>
      <h3>Add Money</h3>

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


      <button type='submit' className="btn btn-primary btn-block">Add</button>
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