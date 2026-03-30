import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!source.trim() || !destination.trim()) return;
    navigate(`/buses?source=${source}&destination=${destination}`);
  };

  return (
    <div className="card">
      <h2>🚌 Find Your Bus</h2>
      <div className="input-group">
        <input
          placeholder="From — e.g. Chennai"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          placeholder="To — e.g. Bangalore"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <button
        className="btn"
        onClick={handleSearch}
        disabled={!source.trim() || !destination.trim()}
      >
        Search Buses →
      </button>
    </div>
  );
}