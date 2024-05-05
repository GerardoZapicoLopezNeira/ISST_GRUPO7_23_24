package DIY4Rent.Grupo0734.DIY4Rent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DIY4Rent.Grupo0734.DIY4Rent.dto.HerramientaDto;
import DIY4Rent.Grupo0734.DIY4Rent.mapper.HerramientaMapper;
import DIY4Rent.Grupo0734.DIY4Rent.model.Herramienta;
import DIY4Rent.Grupo0734.DIY4Rent.repo.HerramientaRepository;
import DIY4Rent.Grupo0734.DIY4Rent.repo.UsuarioRepository;

import java.util.Collections;
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

    public HerramientaDto getHerramientaById(Long id) {
        Optional<Herramienta> herramientaData = herramientaRepository.findById(id);
        herramientaData.orElse(null);
        HerramientaDto herramientaDto = herramientaMapper.toHerramientaDto(herramientaData.get());
        return herramientaDto;
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

    public HerramientaDto updateHerramientaById(Long id, HerramientaDto newHerramientaData) {
        Optional<Herramienta> herramientaData = herramientaRepository.findById(id);
        Herramienta herramienta = herramientaData.get();
        herramienta.setTipo(newHerramientaData.getTipo());
        herramienta.setDescripcion(newHerramientaData.getDescripcion());
        herramienta.setPrecioDiario(newHerramientaData.getPrecioDiario());
        herramienta.setEstadoFisico(newHerramientaData.getEstadoFisico());
        herramienta.setDisponibilidad(newHerramientaData.getDisponibilidad());

        herramientaRepository.save(herramienta);
        return herramientaMapper.toHerramientaDto(herramienta);
    }
    public List<HerramientaDto> getAllHerramientas() {
        List<HerramientaDto> herramientas = herramientaRepository.findAll().stream().map(
            herramienta -> {
                return herramientaMapper.toHerramientaDto(herramienta);
            }).collect(Collectors.toList());
            return herramientas;
    }
    
    public boolean deleteHerramienta(Long id) {
        Optional<Herramienta> herramientaOptional = herramientaRepository.findById(id);
        if (herramientaOptional.isPresent()) {
            Herramienta herramienta = herramientaOptional.get();
            herramientaRepository.delete(herramienta); 
            return true;
        }
        return false;
    }
  
    
}
