package com.bus_app.backend.service;

import com.bus_app.backend.dto.BookingRequest;
import com.bus_app.backend.dto.BookingResponse;
import com.bus_app.backend.model.Booking;
import com.bus_app.backend.model.Bus;
import com.bus_app.backend.model.Seat;
import com.bus_app.backend.repository.BookingRepository;
import com.bus_app.backend.repository.BusRepository;
import com.bus_app.backend.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BusRepository busRepository;
    private final SeatRepository seatRepository;

    public BookingResponse bookTicket(BookingRequest request) {
        Bus bus = busRepository.findById(request.getBusId())
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        List<Seat> seats = seatRepository.findByBusId(bus.getId());

        Seat targetSeat = seats.stream()
                .filter(s -> s.getSeatNumber() == request.getSeatNumber())
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        if (targetSeat.isBooked()) {
            throw new RuntimeException("Seat already booked");
        }

        targetSeat.setBooked(true);
        seatRepository.save(targetSeat);

        Booking booking = new Booking();
        booking.setBus(bus);
        booking.setSeatNumber(request.getSeatNumber());
        booking.setPassengerName(request.getPassengerName());
        booking.setBookingTime(LocalDateTime.now());
        Booking saved = bookingRepository.save(booking);

        return new BookingResponse(
                saved.getId(),
                "CONFIRMED",
                saved.getPassengerName(),
                saved.getSeatNumber(),
                bus.getName(),
                bus.getSource(),
                bus.getDestination()
        );
    }

    public BookingResponse getBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Bus bus = booking.getBus();
        return new BookingResponse(
                booking.getId(),
                "CONFIRMED",
                booking.getPassengerName(),
                booking.getSeatNumber(),
                bus.getName(),
                bus.getSource(),
                bus.getDestination()
        );
    }
}