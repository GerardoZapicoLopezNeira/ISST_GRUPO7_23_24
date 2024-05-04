package DIY4Rent.Grupo0734.DIY4Rent.repo;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import DIY4Rent.Grupo0734.DIY4Rent.dto.HerramientaDto;
import DIY4Rent.Grupo0734.DIY4Rent.model.Herramienta;

@Repository
public interface HerramientaRepository extends JpaRepository<Herramienta, Long> {
    List<Herramienta> findByUsuarioId(Long usuarioId);
    List<Herramienta> findByPrecioDiarioBetween(double precioMin, double precioMax);
    List<Herramienta> findByTipoContainingIgnoreCaseOrDescripcionContainingIgnoreCase(String filtro1, String filtro2);
    List<Herramienta> findByTipoContainingIgnoreCaseOrDescripcionContainingIgnoreCaseAndPrecioDiarioBetween(String filtro1, String filtro2,double precioMin, double precioMax);
    List<Herramienta> findByPrecioDiarioLessThanEqual(Double precioMax);
}


