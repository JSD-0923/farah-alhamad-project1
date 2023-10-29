import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DetailsPage } from "./pages/details-page/DetailsPage";
import "./App.css";
import { Header } from "./components/header/Header";
import { WelcomeBar } from "./components/welcome-bar/WelcomeBar";
import { HomePage } from "./pages/home-page/HomePage";
import { useEffect, useState } from "react";
import { FavContext } from "./context/FavContext";
import { Footer } from "./components/footer/Footer";

function App() {
  const [toggleFavCardsSection, setToggleFavCardsSection] = useState(false);
  const [toggleThemeMode, setToggleThemeMode] = useState();

  const setThemeMode = () => {
    const themeMode = JSON.parse(localStorage.getItem("themeMode"));
    switch (themeMode) {
      case "dark":
        setToggleThemeMode(true);
        break;
      case "light":
        setToggleThemeMode(false);
        break;
      default:
        const darkThemeMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (darkThemeMode) {
          setToggleThemeMode(true);
        } else {
          setToggleThemeMode(false);
        }
        break;
    }
  };

  useEffect(() => {
    setThemeMode();
  }, []);

  return (
    <div className={toggleThemeMode ? "dark" : ""}>
      <Router>
        <FavContext.Provider
          value={{ toggleFavCardsSection, setToggleFavCardsSection }}
        >
          <Header
            toggleThemeMode={toggleThemeMode}
            setToggleThemeMode={setToggleThemeMode}
          />
          <WelcomeBar />
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route
              exact
              path="/details-page/:id"
              element={<DetailsPage />}
            ></Route>
          </Routes>
        </FavContext.Provider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
