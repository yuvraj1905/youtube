import { Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./pages/Body";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./utils/store";
import WatchPage from "./pages/WatchPage";
import ResultsPage from "./pages/ResultsPage";
import { Profile } from "./pages/Profile";
import { Explore } from "./pages/ExplorePages";
import Liked from "./pages/Liked";
import WatchLater from "./pages/WatchLater";
import History from "./pages/History";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <div className="App relative ">
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/likedvideos" element={<Liked />} />
          <Route path="/watchlater" element={<WatchLater />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
