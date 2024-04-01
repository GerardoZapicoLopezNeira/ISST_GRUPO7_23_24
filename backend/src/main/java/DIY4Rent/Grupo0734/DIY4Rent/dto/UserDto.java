package DIY4Rent.Grupo0734.DIY4Rent.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private Long id;
    private String username;
    private String dni;
    private String nombre;
    private String direccion;
    private String email;
    private String telefono;
    private String token;

}