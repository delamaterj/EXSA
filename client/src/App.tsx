import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout pageTitle ="EXSA - Home" heroText="Welcome to EXSA">
              <main>
                <p>This is the home page. This is where the important content will go.</p>
              </main>
            </Layout>
          }
        />
        <Route
          path="/About"
          element={
            <Layout pageTitle ="EXSA - About" heroText="About Us">
              <main>
                <p>About page content goes here.</p>
              </main>
            </Layout>
          }
        />
        <Route
          path="/Members"
          element={
            <Layout pageTitle ="EXSA - Members" heroText="Our Members">
              <main>
                <p>Members page content goes here.</p>
              </main>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
