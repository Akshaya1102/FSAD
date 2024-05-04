import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import './App.css';
import { Homepage, About, Services, Service, Admin, PageNotFound, AllServices} from "./components";

function App() {
  return (
    <Router>
    <div className="App">
      <nav style={{ margin: 10 }}>
          <Link to="/" style={{ padding: 5 }}>
            Home
          </Link>
          <Link to="/About" style={{ padding: 5 }}>
            About
          </Link>
          <Link to="/Services" style={{ padding: 5 }}>
            Services
          </Link>
          <Link to="/Admin" style={{ padding: 5 }}>
            Admin
          </Link>
      </nav>
      <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route path="/About" element={<About />} />
      <Route path="/Services" element={<AllServices />}>
          <Route index element={<Services />} />
          <Route path=":slug" element={<Service />} />
        </Route>
      <Route  path="/Admin" element={<Admin />} />
      <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
