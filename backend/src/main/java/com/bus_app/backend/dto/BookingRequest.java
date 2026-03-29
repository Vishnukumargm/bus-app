package com.bus_app.backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequest {
    private Long busId;
    private int seatNumber;
    private String passengerName;
}