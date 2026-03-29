package com.bus_app.backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {
    private Long bookingId;
    private String status;
    private String passengerName;
    private int seatNumber;
    private String busName;
    private String source;
    private String destination;
}