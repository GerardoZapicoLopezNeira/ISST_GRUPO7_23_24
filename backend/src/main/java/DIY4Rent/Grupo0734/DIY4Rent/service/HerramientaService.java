package DIY4Rent.Grupo0734.DIY4Rent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DIY4Rent.Grupo0734.DIY4Rent.model.Herramienta;
import DIY4Rent.Grupo0734.DIY4Rent.repo.HerramientaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class HerramientaService {

    @Autowired
    private HerramientaRepository herramientaRepository;

    public List<Herramienta> getAllHerramientasByUser(Long id) {
        return herramientaRepository.findByPropietario(id);
    }

    public Herramienta getHerramientaById(Long id) {
        Optional<Herramienta> herramientaData = herramientaRepository.findById(id);
        return herramientaData.orElse(null);
    }

    public Herramienta addHerramienta(Herramienta herramienta) {
        return herramientaRepository.save(herramienta);
    }

    public Herramienta updateHerramientaById(Long id, Herramienta newHerramientaData) {
        Optional<Herramienta> oldHerramientaData = herramientaRepository.findById(id);
        if (oldHerramientaData.isPresent()) {
            Herramienta updatedHerramientaData = oldHerramientaData.get();
            updatedHerramientaData.setPropietario(newHerramientaData.getPropietario());
            updatedHerramientaData.setDisponibilidad(newHerramientaData.getDisponibilidad());
            updatedHerramientaData.setTipo(newHerramientaData.getTipo());
            updatedHerramientaData.setDescripcion(newHerramientaData.getDescripcion());
            updatedHerramientaData.setPrecioDiario(newHerramientaData.getPrecioDiario());
            updatedHerramientaData.setFoto(newHerramientaData.getFoto());
            updatedHerramientaData.setEstadoFisico(newHerramientaData.getEstadoFisico());

            return herramientaRepository.save(updatedHerramientaData);
        }
        return null;
    }

    public void deleteHerramientaById(Long id) {
        herramientaRepository.deleteById(id);
    }

    
}
