import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <nav className="backdrop1">
      <div>
        <p>Logo</p>
      </div>
      <div>
        <p>Home</p>
      </div>
      <div>
        <p>About EXSA</p>
      </div>
      <div>
        <p>Our Members</p>
      </div>
      </nav>
      <div className="backdrop2">
        <h1>Welcome to EXSA</h1>
      </div>
      <footer className="backdrop1">
      <p>Address</p>
      <p>Email</p>
      <p>© 2025 EXSA. All rights reserved.</p>
      <div>
        <p>Facebook Button</p>
      </div>
      <div>
        <p>Instgram Button</p>
      </div>
      </footer>
    </>
    /*
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <p>testing 1</p>
        </a>
        <a href="https://react.dev" target="_blank">
          <h1>testing 2</h1>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
    */
  )
}

export default App
