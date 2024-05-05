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
}


