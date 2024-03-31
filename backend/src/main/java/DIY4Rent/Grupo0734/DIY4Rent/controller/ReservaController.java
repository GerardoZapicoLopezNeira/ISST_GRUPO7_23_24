package DIY4Rent.Grupo0734.DIY4Rent.controller;

import org.springframework.web.bind.annotation.RestController;

import DIY4Rent.Grupo0734.DIY4Rent.model.Reserva;
import DIY4Rent.Grupo0734.DIY4Rent.service.ReservaService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public ResponseEntity<List<Reserva>> getAllReservas() {
        List<Reserva> reservaList = reservaService.getAllReservas();
        if (reservaList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reservaList, HttpStatus.OK);
    }

    @GetMapping("/getReservaById/{id}")
    public ResponseEntity<Reserva> getReservaById(@PathVariable Long id) {
        Reserva reservaData = reservaService.getReservaById(id).orElse(null);
        if (reservaData != null) {
            return new ResponseEntity<>(reservaData, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/addReserva")
    public ResponseEntity<Reserva> addReserva(@RequestBody Reserva reserva) {
        Reserva newReserva = reservaService.addReserva(reserva);
        return new ResponseEntity<>(newReserva, HttpStatus.OK);
    }

    @PostMapping("/updateReservaById/{id}")
    public ResponseEntity<Reserva> updateReservaById(@PathVariable Long id, @RequestBody Reserva newReservaData) {
        Reserva updatedReservaData = reservaService.updateReservaById(id, newReservaData);
        if (updatedReservaData != null) {
            return new ResponseEntity<>(updatedReservaData, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/deleteReservaById/{id}")
    public ResponseEntity<HttpStatus> deleteReservaById(@PathVariable Long id) {
        reservaService.deleteReservaById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
