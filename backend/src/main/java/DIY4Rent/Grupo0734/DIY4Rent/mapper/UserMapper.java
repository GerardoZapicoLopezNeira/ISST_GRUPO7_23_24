package DIY4Rent.Grupo0734.DIY4Rent.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import DIY4Rent.Grupo0734.DIY4Rent.dto.SignUpDto;
import DIY4Rent.Grupo0734.DIY4Rent.dto.UserDto;
import DIY4Rent.Grupo0734.DIY4Rent.model.Usuario;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(Usuario usuario);

    @Mapping(target = "password", ignore = true)
    Usuario signUpToUser(SignUpDto signUpDto);

    

}