package com.bus_app.backend.service;

import com.bus_app.backend.dto.BusResponse;
import com.bus_app.backend.model.Bus;
import com.bus_app.backend.repository.BusRepository;
import com.bus_app.backend.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BusService {

    private final BusRepository busRepository;
    private final SeatRepository seatRepository;

    public List<BusResponse> searchBuses(String source, String destination) {
        List<Bus> buses = busRepository
                .findBySourceIgnoreCaseAndDestinationIgnoreCase(source, destination);

        return buses.stream().map(bus -> {
            int available = seatRepository.countByBusIdAndIsBooked(bus.getId(), false);
            return new BusResponse(
                    bus.getId(),
                    bus.getName(),
                    bus.getSource(),
                    bus.getDestination(),
                    available
            );
        }).collect(Collectors.toList());
    }
}