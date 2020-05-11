package com.alfonsocortez.mitienda.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.alfonsocortez.mitienda.domain.enumeration.PedidoEstado;

/**
 * A Pedido.
 */
@Entity
@Table(name = "pedido")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "fecha_pedido", nullable = false)
    private Instant fechaPedido;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private PedidoEstado estado;

    @NotNull
    @Column(name = "codigo_pedido", nullable = false)
    private String codigoPedido;

    @OneToMany(mappedBy = "pedido")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProductoPedido> productoPedidos = new HashSet<>();

    @OneToMany(mappedBy = "pedido")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Factura> facturas = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("pedidos")
    private Cliente cliente;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("pedidos")
    private ProductoPedido productoPedido;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFechaPedido() {
        return fechaPedido;
    }

    public Pedido fechaPedido(Instant fechaPedido) {
        this.fechaPedido = fechaPedido;
        return this;
    }

    public void setFechaPedido(Instant fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public PedidoEstado getEstado() {
        return estado;
    }

    public Pedido estado(PedidoEstado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(PedidoEstado estado) {
        this.estado = estado;
    }

    public String getCodigoPedido() {
        return codigoPedido;
    }

    public Pedido codigoPedido(String codigoPedido) {
        this.codigoPedido = codigoPedido;
        return this;
    }

    public void setCodigoPedido(String codigoPedido) {
        this.codigoPedido = codigoPedido;
    }

    public Set<ProductoPedido> getProductoPedidos() {
        return productoPedidos;
    }

    public Pedido productoPedidos(Set<ProductoPedido> productoPedidos) {
        this.productoPedidos = productoPedidos;
        return this;
    }

    public Pedido addProductoPedido(ProductoPedido productoPedido) {
        this.productoPedidos.add(productoPedido);
        productoPedido.setPedido(this);
        return this;
    }

    public Pedido removeProductoPedido(ProductoPedido productoPedido) {
        this.productoPedidos.remove(productoPedido);
        productoPedido.setPedido(null);
        return this;
    }

    public void setProductoPedidos(Set<ProductoPedido> productoPedidos) {
        this.productoPedidos = productoPedidos;
    }

    public Set<Factura> getFacturas() {
        return facturas;
    }

    public Pedido facturas(Set<Factura> facturas) {
        this.facturas = facturas;
        return this;
    }

    public Pedido addFactura(Factura factura) {
        this.facturas.add(factura);
        factura.setPedido(this);
        return this;
    }

    public Pedido removeFactura(Factura factura) {
        this.facturas.remove(factura);
        factura.setPedido(null);
        return this;
    }

    public void setFacturas(Set<Factura> facturas) {
        this.facturas = facturas;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Pedido cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public ProductoPedido getProductoPedido() {
        return productoPedido;
    }

    public Pedido productoPedido(ProductoPedido productoPedido) {
        this.productoPedido = productoPedido;
        return this;
    }

    public void setProductoPedido(ProductoPedido productoPedido) {
        this.productoPedido = productoPedido;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pedido)) {
            return false;
        }
        return id != null && id.equals(((Pedido) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Pedido{" +
            "id=" + getId() +
            ", fechaPedido='" + getFechaPedido() + "'" +
            ", estado='" + getEstado() + "'" +
            ", codigoPedido='" + getCodigoPedido() + "'" +
            "}";
    }
}
