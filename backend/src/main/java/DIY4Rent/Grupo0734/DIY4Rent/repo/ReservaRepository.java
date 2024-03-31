package DIY4Rent.Grupo0734.DIY4Rent.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import DIY4Rent.Grupo0734.DIY4Rent.model.Reserva;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long>{

}
