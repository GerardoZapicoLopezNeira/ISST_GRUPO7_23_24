package DIY4Rent.Grupo0734.DIY4Rent.mapper;

import org.mapstruct.Mapper;

import DIY4Rent.Grupo0734.DIY4Rent.dto.ReservaDto;
import DIY4Rent.Grupo0734.DIY4Rent.model.Reserva;

@Mapper(componentModel = "spring")
public interface ReservaMapper {

    ReservaDto toReservaDto(Reserva reserva);

    Reserva reservaDtoToReserva(ReservaDto reservaDto);
    
}
