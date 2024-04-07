package DIY4Rent.Grupo0734.DIY4Rent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DIY4Rent.Grupo0734.DIY4Rent.dto.HerramientaDto;
import DIY4Rent.Grupo0734.DIY4Rent.mapper.HerramientaMapper;
import DIY4Rent.Grupo0734.DIY4Rent.model.Herramienta;
import DIY4Rent.Grupo0734.DIY4Rent.repo.HerramientaRepository;
import DIY4Rent.Grupo0734.DIY4Rent.repo.UsuarioRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HerramientaService {

    @Autowired
    private HerramientaRepository herramientaRepository;
    
    @Autowired
    private HerramientaMapper herramientaMapper;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<HerramientaDto> getAllHerramientasByUsuarioId(Long usuarioId) {
         
    
        List<HerramientaDto> herramientas = herramientaRepository.findByUsuarioId(usuarioId).stream().map(
            herramienta -> {
                return herramientaMapper.toHerramientaDto(herramienta);
            }).collect(Collectors.toList());
            return herramientas;
        
    }

    public Herramienta getHerramientaById(Long id) {
        Optional<Herramienta> herramientaData = herramientaRepository.findById(id);
        return herramientaData.orElse(null);
    }

    public HerramientaDto createHerramienta(HerramientaDto herramientaDto, Long usuarioId) {

        Herramienta herramienta = herramientaMapper.herramientaDtoToHerramienta(herramientaDto);
        Herramienta savedHerramienta = usuarioRepository.findById(usuarioId).map(usuario -> {
            herramienta.setUsuario(usuario);
            return herramienta;
        }).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        herramientaRepository.save(savedHerramienta);
        return herramientaMapper.toHerramientaDto(savedHerramienta);
    }
/*
    public Herramienta updateHerramientaById(Long id, Herramienta newHerramientaData) {
        Optional<Herramienta> oldHerramientaData = herramientaRepository.findById(id);
        if (oldHerramientaData.isPresent()) {
            Herramienta updatedHerramientaData = oldHerramientaData.get();
            updatedHerramientaData.setUsuario(newHerramientaData.getUsuario());
            updatedHerramientaData.setDisponibilidad(newHerramientaData.getDisponibilidad());
            updatedHerramientaData.setTipo(newHerramientaData.getTipo());
            updatedHerramientaData.setDescripcion(newHerramientaData.getDescripcion());
            updatedHerramientaData.setPrecioDiario(newHerramientaData.getPrecioDiario());
            // updatedHerramientaData.setFoto(newHerramientaData.getFoto());
            updatedHerramientaData.setEstadoFisico(newHerramientaData.getEstadoFisico());

            return herramientaRepository.save(updatedHerramientaData);
        }
        return null;
    }

    public void deleteHerramientaById(Long id) {
        herramientaRepository.deleteById(id);
    }
 */
    
}
