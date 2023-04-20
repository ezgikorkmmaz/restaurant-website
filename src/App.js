import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import WelcomePage from './Pages/Welcome';
import MenuPage from './Pages/Menu';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<WelcomePage />}/>
          <Route exact path="/menu" element={<MenuPage/>}/>
        </Routes>
    </Router>
    </div>
  );
}

export default App;
