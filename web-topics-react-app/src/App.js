import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DetailsPage } from "./pages/details-page/DetailsPage";
import "./App.css";
import { Header } from "./components/header/Header";
import { WelcomeBar } from "./components/welcome-bar/WelcomeBar";
import { HomePage } from "./pages/home-page/HomePage";

function App() {
  return (
    <Router>
      <Header />
      <WelcomeBar />
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route exact path="/details-page/:id" element={<DetailsPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
