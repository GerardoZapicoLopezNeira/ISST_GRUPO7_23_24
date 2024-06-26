package DIY4Rent.Grupo0734.DIY4Rent.mapper;

import org.mapstruct.Mapper;

import DIY4Rent.Grupo0734.DIY4Rent.dto.HerramientaDto;
import DIY4Rent.Grupo0734.DIY4Rent.model.Herramienta;

@Mapper(componentModel = "spring")
public interface HerramientaMapper {
            
        HerramientaDto toHerramientaDto(Herramienta herramienta);
    
        Herramienta herramientaDtoToHerramienta(HerramientaDto herramientaDto);

}
