import { useNavigate } from "react-router-dom";

export default function BusCard({ bus }) {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ maxWidth: "100%", marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-head)", fontSize: "1.1rem", fontWeight: 700 }}>
            {bus.name}
          </h3>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
            {bus.source} → {bus.destination}
          </p>
        </div>
        <span className="tag">{bus.availableSeats} seats left</span>
      </div>

      <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem" }}>
        <button
          className="btn"
          style={{ maxWidth: 160 }}
          onClick={() => navigate(`/seats/${bus.id}`, { state: { bus } })}
          disabled={bus.availableSeats === 0}
        >
          Select Seat
        </button>
      </div>
    </div>
  );
}