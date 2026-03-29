package com.bus_app.backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusResponse {
    private Long id;
    private String name;
    private String source;
    private String destination;
    private int availableSeats;
}