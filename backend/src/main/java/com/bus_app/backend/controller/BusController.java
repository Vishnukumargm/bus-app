package com.bus_app.backend.controller;

import com.bus_app.backend.dto.BusResponse;
import com.bus_app.backend.model.Seat;
import com.bus_app.backend.repository.SeatRepository;
import com.bus_app.backend.service.BusService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/buses")
@RequiredArgsConstructor
public class BusController {

    private final BusService busService;
    private final SeatRepository seatRepository;

    @GetMapping
    public List<BusResponse> searchBuses(
            @RequestParam String source,
            @RequestParam String destination
    ) {
        return busService.searchBuses(source, destination);
    }

    @GetMapping("/{busId}/seats")
    public List<Seat> getSeats(@PathVariable Long busId) {
        return seatRepository.findByBusId(busId);
    }
}