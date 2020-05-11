package com.alfonsocortez.mitienda.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.alfonsocortez.mitienda.domain.enumeration.FacturaEstado;

import com.alfonsocortez.mitienda.domain.enumeration.MetodoPago;

/**
 * A Factura.
 */
@Entity
@Table(name = "factura")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Factura implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private Instant fecha;

    @Column(name = "detalles")
    private String detalles;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private FacturaEstado estado;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "metodo_de_pago", nullable = false)
    private MetodoPago metodoDePago;

    @NotNull
    @Column(name = "fecha_de_pago", nullable = false)
    private Instant fechaDePago;

    @NotNull
    @Column(name = "monto_pagado", precision = 21, scale = 2, nullable = false)
    private BigDecimal montoPagado;

    @OneToMany(mappedBy = "factura")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Envio> envios = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("facturas")
    private Cliente cliente;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("facturas")
    private Pedido pedido;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFecha() {
        return fecha;
    }

    public Factura fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public String getDetalles() {
        return detalles;
    }

    public Factura detalles(String detalles) {
        this.detalles = detalles;
        return this;
    }

    public void setDetalles(String detalles) {
        this.detalles = detalles;
    }

    public FacturaEstado getEstado() {
        return estado;
    }

    public Factura estado(FacturaEstado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(FacturaEstado estado) {
        this.estado = estado;
    }

    public MetodoPago getMetodoDePago() {
        return metodoDePago;
    }

    public Factura metodoDePago(MetodoPago metodoDePago) {
        this.metodoDePago = metodoDePago;
        return this;
    }

    public void setMetodoDePago(MetodoPago metodoDePago) {
        this.metodoDePago = metodoDePago;
    }

    public Instant getFechaDePago() {
        return fechaDePago;
    }

    public Factura fechaDePago(Instant fechaDePago) {
        this.fechaDePago = fechaDePago;
        return this;
    }

    public void setFechaDePago(Instant fechaDePago) {
        this.fechaDePago = fechaDePago;
    }

    public BigDecimal getMontoPagado() {
        return montoPagado;
    }

    public Factura montoPagado(BigDecimal montoPagado) {
        this.montoPagado = montoPagado;
        return this;
    }

    public void setMontoPagado(BigDecimal montoPagado) {
        this.montoPagado = montoPagado;
    }

    public Set<Envio> getEnvios() {
        return envios;
    }

    public Factura envios(Set<Envio> envios) {
        this.envios = envios;
        return this;
    }

    public Factura addEnvio(Envio envio) {
        this.envios.add(envio);
        envio.setFactura(this);
        return this;
    }

    public Factura removeEnvio(Envio envio) {
        this.envios.remove(envio);
        envio.setFactura(null);
        return this;
    }

    public void setEnvios(Set<Envio> envios) {
        this.envios = envios;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Factura cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public Factura pedido(Pedido pedido) {
        this.pedido = pedido;
        return this;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Factura)) {
            return false;
        }
        return id != null && id.equals(((Factura) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Factura{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", detalles='" + getDetalles() + "'" +
            ", estado='" + getEstado() + "'" +
            ", metodoDePago='" + getMetodoDePago() + "'" +
            ", fechaDePago='" + getFechaDePago() + "'" +
            ", montoPagado=" + getMontoPagado() +
            "}";
    }
}
