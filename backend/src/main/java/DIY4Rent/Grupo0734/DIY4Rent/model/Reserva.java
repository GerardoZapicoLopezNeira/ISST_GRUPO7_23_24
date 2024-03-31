package DIY4Rent.Grupo0734.DIY4Rent.model;

import java.util.Date;

import jakarta.persistence.Column;
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
@Table(name="reservas")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_herramienta")
    private Herramienta herramienta;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Column(name = "fecha_recogida")
    private Date fechaRecogida;
    @Column(name = "fecha_devolucion")
    private Date fechaDevolucion;
    private Double importe;
    private String estado;
    


}
