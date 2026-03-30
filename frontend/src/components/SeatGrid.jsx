export default function SeatGrid({ seats, selected, onSelect }) {
  return (
    <div>
      <div style={{
        display: "flex", gap: "0.5rem", marginBottom: "1rem",
        flexWrap: "wrap", fontSize: "0.8rem", color: "var(--muted)"
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <span style={{ width: 14, height: 14, borderRadius: 4, background: "var(--surface)", border: "1px solid var(--border)", display: "inline-block" }} />
          Available
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <span style={{ width: 14, height: 14, borderRadius: 4, background: "var(--accent)", display: "inline-block" }} />
          Selected
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <span style={{ width: 14, height: 14, borderRadius: 4, background: "var(--border)", display: "inline-block" }} />
          Booked
        </span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "0.6rem"
      }}>
        {seats.map((seat) => {
          const isSelected = selected === seat.seatNumber;
          const isBooked = seat.booked;

          return (
            <button
              key={seat.seatNumber}
              onClick={() => !isBooked && onSelect(seat.seatNumber)}
              style={{
                padding: "0.75rem 0",
                borderRadius: "8px",
                border: isSelected ? "2px solid var(--accent)" : "1px solid var(--border)",
                background: isBooked
                  ? "var(--border)"
                  : isSelected
                  ? "var(--accent)"
                  : "var(--surface)",
                color: isBooked ? "var(--muted)" : "var(--text)",
                cursor: isBooked ? "not-allowed" : "pointer",
                fontFamily: "var(--font-head)",
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "all 0.15s"
              }}
              disabled={isBooked}
            >
              {seat.seatNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
}