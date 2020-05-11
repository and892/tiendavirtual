package com.alfonsocortez.mitienda.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

/**
 * A Envio.
 */
@Entity
@Table(name = "envio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Envio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha")
    private String fecha;

    @NotNull
    @Column(name = "detalles", nullable = false)
    private Instant detalles;

    @Column(name = "codigo_localizacion")
    private String codigoLocalizacion;

    @ManyToOne
    @JsonIgnoreProperties("envios")
    private Factura factura;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFecha() {
        return fecha;
    }

    public Envio fecha(String fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public Instant getDetalles() {
        return detalles;
    }

    public Envio detalles(Instant detalles) {
        this.detalles = detalles;
        return this;
    }

    public void setDetalles(Instant detalles) {
        this.detalles = detalles;
    }

    public String getCodigoLocalizacion() {
        return codigoLocalizacion;
    }

    public Envio codigoLocalizacion(String codigoLocalizacion) {
        this.codigoLocalizacion = codigoLocalizacion;
        return this;
    }

    public void setCodigoLocalizacion(String codigoLocalizacion) {
        this.codigoLocalizacion = codigoLocalizacion;
    }

    public Factura getFactura() {
        return factura;
    }

    public Envio factura(Factura factura) {
        this.factura = factura;
        return this;
    }

    public void setFactura(Factura factura) {
        this.factura = factura;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Envio)) {
            return false;
        }
        return id != null && id.equals(((Envio) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Envio{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", detalles='" + getDetalles() + "'" +
            ", codigoLocalizacion='" + getCodigoLocalizacion() + "'" +
            "}";
    }
}
