package DIY4Rent.Grupo0734.DIY4Rent.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DIY4Rent.Grupo0734.DIY4Rent.dto.ReservaDto;
import DIY4Rent.Grupo0734.DIY4Rent.mapper.ReservaMapper;
import DIY4Rent.Grupo0734.DIY4Rent.model.Reserva;
import DIY4Rent.Grupo0734.DIY4Rent.repo.HerramientaRepository;
import DIY4Rent.Grupo0734.DIY4Rent.repo.ReservaRepository;
import DIY4Rent.Grupo0734.DIY4Rent.repo.UsuarioRepository;

@Service
public class ReservaService {
    
    @Autowired
    private ReservaRepository reservaRepository;
    
    @Autowired
    private ReservaMapper reservaMapper;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private HerramientaRepository herramientaRepository;

    public ReservaDto createReserva(ReservaDto reservaDto, Long usuarioId, Long herramientaId) {
    
        Reserva reserva = reservaMapper.reservaDtoToReserva(reservaDto);
        Reserva savedReserva = usuarioRepository.findById(usuarioId).map(usuario -> {
            reserva.setUsuario(usuario);
            herramientaRepository.findById(herramientaId).map(herramienta -> {
                reserva.setHerramienta(herramienta);
                return reserva;
            }).orElseThrow(() -> new RuntimeException("Herramienta no encontrada"));
            return reserva;
        }).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    
        reservaRepository.save(savedReserva);
    
        return reservaMapper.toReservaDto(savedReserva);
    }
    
    public List<ReservaDto> getReservasByHerramientaId(Long herramientaId) {
        List<ReservaDto> reservas = reservaRepository.findByHerramientaId(herramientaId).stream().map(
            reserva -> {
                return reservaMapper.toReservaDto(reserva);
            }).collect(Collectors.toList());
            return reservas;
    }

    public List<ReservaDto> getReservasByUsuarioId(Long usuarioId) {
        List<ReservaDto> reservas = reservaRepository.findByUsuarioId(usuarioId).stream().map(
            reserva -> {
                return reservaMapper.toReservaDto(reserva);
            }).collect(Collectors.toList());
            return reservas;
    }
}
