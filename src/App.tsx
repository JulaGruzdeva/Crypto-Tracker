import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import CoinsPage from "./Pages/CoinsPage";
import HomePage from "./Pages/HomePage";


function App() {
  const useStyles = makeStyles(() => ({
    App: {
      background: '#1A1E29',
      minHeight: '100vh',
      color: 'white'
    }
  }));

  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins:id" element={<CoinsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
