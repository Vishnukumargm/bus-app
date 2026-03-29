package com.bus_app.backend.repository;


import com.bus_app.backend.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BusRepository extends JpaRepository<Bus, Long> {
    List<Bus> findBySourceIgnoreCaseAndDestinationIgnoreCase(String source, String destination);
}