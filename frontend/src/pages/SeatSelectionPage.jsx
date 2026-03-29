import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getSeats, bookTicket } from "../services/api";
import SeatGrid from "../components/SeatGrid";

export default function SeatSelectionPage() {
  const { busId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const bus = state?.bus;

  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getSeats(busId)
      .then((res) => setSeats(res.data))
      .catch(() => setError("Failed to load seats."))
      .finally(() => setLoading(false));
  }, [busId]);

  const handleBook = async () => {
    if (!selected || !name.trim()) return;
    setBooking(true);
    setError("");
    try {
      const res = await bookTicket({
        busId: Number(busId),
        seatNumber: selected,
        passengerName: name.trim(),
      });
      navigate(`/confirmation/${res.data.bookingId}`);
    } catch {
      setError("Booking failed. Seat may already be taken.");
      setBooking(false);
    }
  };

  return (
    <div className="page">
      <div className="logo">Bus<span>GO</span></div>

      <div className="card" style={{ maxWidth: 520 }}>
        <h2>{bus?.name || "Select Seat"}</h2>
        {bus && (
          <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            {bus.source} → {bus.destination}
          </p>
        )}

        {loading && <p className="loading">Loading seats...</p>}
        {!loading && (
          <>
            <SeatGrid seats={seats} selected={selected} onSelect={setSelected} />

            <div style={{ marginTop: "1.5rem" }}>
              <input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginBottom: "1rem" }}
              />

              {selected && (
                <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>
                  Selected: <strong style={{ color: "var(--accent)" }}>Seat {selected}</strong>
                </p>
              )}

              {error && <p className="error" style={{ marginBottom: "0.75rem" }}>{error}</p>}

              <button
                className="btn"
                onClick={handleBook}
                disabled={!selected || !name.trim() || booking}
              >
                {booking ? "Booking..." : "Confirm Booking →"}
              </button>
              <button className="btn btn-outline" onClick={() => navigate(-1)}>
                ← Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}