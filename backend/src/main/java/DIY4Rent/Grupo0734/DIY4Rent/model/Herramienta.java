package DIY4Rent.Grupo0734.DIY4Rent.model;
import java.sql.Blob;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name="Herramientas")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Herramienta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_propietario")
    private Usuario propietario;
    private Boolean disponibilidad;
    private String tipo;
    private String descripcion;
    private Double precioDiario;
    private Blob foto;
    private String estadoFisico;
}
