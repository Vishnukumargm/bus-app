import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBooking } from "../services/api";

export default function ConfirmationPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooking(bookingId)
      .then((res) => setBooking(res.data))
      .finally(() => setLoading(false));
  }, [bookingId]);

  if (loading) return <div className="page"><p className="loading">Loading...</p></div>;

  return (
    <div className="page">
      <div className="logo">Bus<span>GO</span></div>

      <div className="card" style={{ maxWidth: 480, textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>

        <h2 style={{ marginBottom: "0.5rem" }}>Booking Confirmed!</h2>
        <p style={{ color: "var(--muted)", marginBottom: "2rem", fontSize: "0.9rem" }}>
          Your ticket is ready
        </p>

        <div style={{
          background: "var(--surface)",
          borderRadius: "12px",
          padding: "1.5rem",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
          marginBottom: "1.5rem"
        }}>
          {[
            ["Booking ID", `#${booking.bookingId}`],
            ["Passenger", booking.passengerName],
            ["Bus", booking.busName],
            ["Route", `${booking.source} → ${booking.destination}`],
            ["Seat", `Seat ${booking.seatNumber}`],
            ["Status", booking.status],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{label}</span>
              <span style={{
                fontWeight: 600,
                color: label === "Status" ? "var(--green)" : "var(--text)",
                fontSize: "0.9rem"
              }}>{value}</span>
            </div>
          ))}
        </div>

        <button className="btn" onClick={() => navigate("/")}>
          Book Another Bus
        </button>
      </div>
    </div>
  );
}