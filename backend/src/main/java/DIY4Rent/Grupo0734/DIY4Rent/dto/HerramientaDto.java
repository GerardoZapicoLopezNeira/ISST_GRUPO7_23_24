package DIY4Rent.Grupo0734.DIY4Rent.dto;

import java.sql.Blob;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HerramientaDto {
    
        private Long id;
        private Boolean disponibilidad;
        private String tipo;
        private String descripcion;
        private Double precioDiario;
        private String estadoFisico;
        // private MultipartFile foto;
        
}   
