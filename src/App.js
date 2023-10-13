import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Country from './pages/Country';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/country/:name' element={<Country />} />
          <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
