package DIY4Rent.Grupo0734.DIY4Rent.dto;


import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpDto {

    @NotEmpty
    private String dni;

    @NotEmpty
    private String nombre;

    @NotEmpty
    private String direccion;

    @NotEmpty
    private String email;
    
    @NotEmpty
    private String telefono;

    @NotEmpty
    private String username;
    private Float lat;
    private Float lng;

    @NotEmpty
    private char[] password;

}