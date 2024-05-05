package DIY4Rent.Grupo0734.DIY4Rent.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="reserva")
@NoArgsConstructor
@AllArgsConstructor
public class Reserva {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "herramienta_id", nullable = false)
    private Herramienta herramienta;

    @Column(name = "estado", nullable = false)
    private String estado;

    @Column(name = "importe", nullable = false)
    private Double importe;

    @Column(name = "año_recogida", nullable = false)
    private Integer añoRecogida;

    @Column(name = "mes_recogida", nullable = false)
    private Integer mesRecogida;

    @Column(name = "dia_recogida", nullable = false)
    private Integer diaRecogida;

    @Column(name = "año_devolucion", nullable = false)
    private Integer añoDevolucion;

    @Column(name = "mes_devolucion", nullable = false)
    private Integer mesDevolucion;

    @Column(name = "dia_devolucion", nullable = false)
    private Integer diaDevolucion;




}
