import { Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./utils/store";
import WatchPage from "./components/WatchPage";
import ResultsPage from "./components/ResultsPage";

function App() {
  return (
    <Provider store={store}>
      <div className="App relative ">
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
