import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Components/Homepage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/*" element={<Homepage/>} />
          <Route exact path="/homepage" element={<Homepage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
