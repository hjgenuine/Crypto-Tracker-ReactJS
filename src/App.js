import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import './App.css';

const useStyles = makeStyles({
  App: {
    backgroundColor: "black",
    color: "white",
    minHeight: "100vh"
  }
})

function App() {
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
  });

  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route exact path='/' element={< Homepage />} />
            <Route exact path="/coin/:id" element={< CoinPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
