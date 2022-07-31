import { Routes, Route } from "react-router-dom";
import {
  Home,
  WaitingListHistory,
  TodayWaitingList,
  WaitingList,
} from "./views";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/waiting-list-history" element={<WaitingListHistory />} />
      <Route
        path="/today-waiting-list/:listId"
        element={<TodayWaitingList />}
      />
      <Route path="/waiting-list/:listId" element={<WaitingList />} />
    </Routes>
  );
}

export default App;
