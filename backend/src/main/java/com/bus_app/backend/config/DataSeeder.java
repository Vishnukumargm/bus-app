package com.bus_app.backend.config;

import com.bus_app.backend.model.Bus;
import com.bus_app.backend.model.Seat;
import com.bus_app.backend.repository.BusRepository;
import com.bus_app.backend.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final BusRepository busRepository;
    private final SeatRepository seatRepository;

    @Override
    public void run(String... args) {
        if (busRepository.count() > 0) return;

        List<Bus> buses = List.of(
                new Bus(null, "Express King", "Chennai", "Bangalore", 20),
                new Bus(null, "Night Rider", "Chennai", "Bangalore", 20),
                new Bus(null, "Volvo Deluxe", "Chennai", "Bangalore", 20),
                new Bus(null, "City Liner", "Chennai", "Mumbai", 20),
                new Bus(null, "Highway Star", "Bangalore", "Hyderabad", 20)
        );

        List<Bus> savedBuses = busRepository.saveAll(buses);

        List<Seat> seats = new ArrayList<>();
        for (Bus bus : savedBuses) {
            for (int i = 1; i <= 20; i++) {
                seats.add(new Seat(null, bus, i, false));
            }
        }
        seatRepository.saveAll(seats);
        System.out.println("✅ Seeded " + savedBuses.size() + " buses with 20 seats each.");
    }
}