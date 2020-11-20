import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to EPAYCO
        </h1>

        <div className="grid">
          <a href="/user/register" className="card">
            <h3>Register &rarr;</h3>
            <p>Crate wallet.</p>
          </a>

          <a href="/user/balance" className="card">
            <h3>Balance &rarr;</h3>
            <p>Get your balance.</p>
          </a>

          <a href="/user/send" className="card">
            <h3>Send Money &rarr;</h3>
            <p>Send money to user.</p>
          </a>

         <a href="/user/add" className="card">
            <h3>Add balance &rarr;</h3>
            <p>Add balance to wallet.</p>
          </a>

        </div>
      </main>

      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer> */}


    </div>
  )
}
