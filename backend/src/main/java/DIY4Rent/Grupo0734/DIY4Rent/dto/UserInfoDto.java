package DIY4Rent.Grupo0734.DIY4Rent.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoDto {
    
    private String email;
    private String nombre;
    private String telefono;
    private String dni;
    private String direccion;
}
