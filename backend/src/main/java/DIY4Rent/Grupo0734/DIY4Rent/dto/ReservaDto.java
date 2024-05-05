package DIY4Rent.Grupo0734.DIY4Rent.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservaDto {
    
    private Long id;
    private String estado;
    private Double importe;
    private HerramientaDto herramienta;
    private Integer añoRecogida;
    private Integer mesRecogida;
    private Integer diaRecogida;
    private Integer añoDevolucion;
    private Integer mesDevolucion;
    private Integer diaDevolucion;

}
