import Button from './components/Button';
import './App.css';

function App() {
  return (
    <>
    <nav className="backdrop1">
      <div>
        <p>Logo</p>
      </div>
      <Button title="Home" disabled={false} url="/Home"/>
      <Button title="About EXSA" disabled={false} url="/AboutEXSA"/>
      <Button title="Our Members" disabled={false} url="/OurMembers"/>
      </nav>
      <div className="backdrop2">
        <h1>Welcome to EXSA</h1>
      </div>
      <div>
        <br/>
        <p>This is the home page. This is where the important content will go.</p>
        <br/>
      </div>
      <footer className="backdrop1">
      <p>Address</p>
      <p>Email</p>
      <p>© 2025 EXSA. All rights reserved.</p>
      <Button title="Facebook" disabled={false} url="/Facebook"/>
      <Button title="Instagram" disabled={false} url="/Instagram"/>
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

export default App;
