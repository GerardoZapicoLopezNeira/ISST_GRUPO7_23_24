package DIY4Rent.Grupo0734.DIY4Rent.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import DIY4Rent.Grupo0734.DIY4Rent.dto.ReservaDto;
import DIY4Rent.Grupo0734.DIY4Rent.repo.HerramientaRepository;
import DIY4Rent.Grupo0734.DIY4Rent.repo.ReservaRepository;
import DIY4Rent.Grupo0734.DIY4Rent.service.ReservaService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class ReservaController {
    
    @Autowired
    private ReservaService reservaService;

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private HerramientaRepository herramientaRepository;
    

    @PostMapping("/api/v1/reservas/{usuarioId}/{herramientaId}")
    public ResponseEntity<ReservaDto> createReserva(@PathVariable(value="usuarioId") Long usuarioId, @PathVariable(value="herramientaId") Long herramientaId, @RequestBody ReservaDto reservaDto) {

        ReservaDto newReserva = reservaService.createReserva(reservaDto, usuarioId, herramientaId);
        if (newReserva != null) {
            return new ResponseEntity<>(newReserva, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/api/v1/herramientas/{herramientaId}/reservas")
    public ResponseEntity<List<ReservaDto>> getReservasByHerramientaId(@PathVariable(value="herramientaId") Long herramientaId) {
        if(!herramientaRepository.existsById(herramientaId)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<ReservaDto> reservaList = reservaService.getReservasByHerramientaId(herramientaId);

        if(reservaList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reservaList, HttpStatus.OK);

    }

    @GetMapping("/api/v1/users/{usuarioId}/reservas")
    public ResponseEntity<List<ReservaDto>> getReservasByUsuarioId(@PathVariable(value="usuarioId") Long usuarioId) {
        if(!reservaRepository.existsById(usuarioId)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<ReservaDto> reservaList = reservaService.getReservasByUsuarioId(usuarioId);

        if(reservaList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reservaList, HttpStatus.OK);

    }


    @PutMapping("/api/v1/reservas/{reservaId}")
    public ResponseEntity<ReservaDto> updateReserva(@PathVariable(value="reservaId") Long reservaId, @RequestBody ReservaDto reservaDto) {
        ReservaDto updatedReserva = reservaService.updateReserva(reservaId, reservaDto);
        if (updatedReserva != null) {
            return new ResponseEntity<>(updatedReserva, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/api/v1/reservas/{reservaId}")
    public ResponseEntity<HttpStatus> deleteReserva(@PathVariable(value="reservaId") Long reservaId) {
        reservaService.deleteReserva(reservaId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
