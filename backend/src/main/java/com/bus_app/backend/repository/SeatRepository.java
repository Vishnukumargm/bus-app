package com.bus_app.backend.repository;


import com.bus_app.backend.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByBusId(Long busId);
    int countByBusIdAndIsBooked(Long busId, boolean isBooked);
}