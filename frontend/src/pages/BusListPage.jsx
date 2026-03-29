import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchBuses } from "../services/api";
import BusCard from "../components/BusCard";

export default function BusListPage() {
  const [params] = useSearchParams();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const source = params.get("source");
  const destination = params.get("destination");

  useEffect(() => {
    searchBuses(source, destination)
      .then((res) => setBuses(res.data))
      .catch(() => setError("Failed to fetch buses. Is backend running?"))
      .finally(() => setLoading(false));
  }, [source, destination]);

  return (
    <div className="page">
      <div className="logo">Bus<span>GO</span></div>

      <div style={{ width: "100%", maxWidth: 520 }}>
        <div style={{ marginBottom: "1.25rem" }}>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: "1.2rem" }}>
            {source} → {destination}
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
            {buses.length} bus{buses.length !== 1 ? "es" : ""} found
          </p>
        </div>

        {loading && <p className="loading">Searching buses...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && buses.length === 0 && (
          <p className="loading">No buses found for this route.</p>
        )}
        {buses.map((bus) => <BusCard key={bus.id} bus={bus} />)}

        <button className="btn btn-outline" onClick={() => navigate("/")}>
          ← Back to Search
        </button>
      </div>
    </div>
  );
}