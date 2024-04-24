import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ChooseLanguage from './pages/ChooseLanguage';
import Game from './pages/Game';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/chooseLanguage"
          element={<ChooseLanguage />}
        />
        <Route
          path="/spanishExpressions"
          element={<Game />}
        />
        <Route
          path="/englishExpressions"
          element={<Game />}
        />
      </Routes>
    </>
  );
}

export default App;
