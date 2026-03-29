import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import BusListPage from "./pages/BusListPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import ConfirmationPage from "./pages/ConfirmationPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/buses" element={<BusListPage />} />
        <Route path="/seats/:busId" element={<SeatSelectionPage />} />
        <Route path="/confirmation/:bookingId" element={<ConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  );
}