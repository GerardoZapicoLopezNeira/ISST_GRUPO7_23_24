package DIY4Rent.Grupo0734.DIY4Rent.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DIY4Rent.Grupo0734.DIY4Rent.model.Reserva;
import DIY4Rent.Grupo0734.DIY4Rent.repo.ReservaRepository;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public List<Reserva> getAllReservas() {
        return reservaRepository.findAll();
    }

    public Optional<Reserva> getReservaById(Long id) {
        return reservaRepository.findById(id);
    }

    public Reserva addReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    public Reserva updateReservaById(Long id, Reserva newReservaData) {
        Optional<Reserva> oldReservaData = reservaRepository.findById(id);
        if (oldReservaData.isPresent()) {
            Reserva updatedReservaData = oldReservaData.get();
            updatedReservaData.setFechaRecogida(newReservaData.getFechaRecogida());
            updatedReservaData.setFechaDevolucion(newReservaData.getFechaDevolucion());
            updatedReservaData.setImporte(newReservaData.getImporte());
            updatedReservaData.setEstado(newReservaData.getEstado());
            return reservaRepository.save(updatedReservaData);
        }
        return null;
    }

    public void deleteReservaById(Long id) {
        reservaRepository.deleteById(id);
    }
}
