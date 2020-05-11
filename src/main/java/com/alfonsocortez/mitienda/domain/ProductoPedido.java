package com.alfonsocortez.mitienda.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import com.alfonsocortez.mitienda.domain.enumeration.ProductoPedidoEstado;

/**
 * A ProductoPedido.
 */
@Entity
@Table(name = "producto_pedido")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProductoPedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Min(value = 0)
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "precio_total", precision = 21, scale = 2, nullable = false)
    private BigDecimal precioTotal;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private ProductoPedidoEstado estado;

    @OneToMany(mappedBy = "productoPedido")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Pedido> pedidos = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("productoPedidos")
    private Producto producto;

    @ManyToOne
    @JsonIgnoreProperties("productoPedidos")
    private Pedido pedido;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public ProductoPedido cantidad(Integer cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecioTotal() {
        return precioTotal;
    }

    public ProductoPedido precioTotal(BigDecimal precioTotal) {
        this.precioTotal = precioTotal;
        return this;
    }

    public void setPrecioTotal(BigDecimal precioTotal) {
        this.precioTotal = precioTotal;
    }

    public ProductoPedidoEstado getEstado() {
        return estado;
    }

    public ProductoPedido estado(ProductoPedidoEstado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(ProductoPedidoEstado estado) {
        this.estado = estado;
    }

    public Set<Pedido> getPedidos() {
        return pedidos;
    }

    public ProductoPedido pedidos(Set<Pedido> pedidos) {
        this.pedidos = pedidos;
        return this;
    }

    public ProductoPedido addPedido(Pedido pedido) {
        this.pedidos.add(pedido);
        pedido.setProductoPedido(this);
        return this;
    }

    public ProductoPedido removePedido(Pedido pedido) {
        this.pedidos.remove(pedido);
        pedido.setProductoPedido(null);
        return this;
    }

    public void setPedidos(Set<Pedido> pedidos) {
        this.pedidos = pedidos;
    }

    public Producto getProducto() {
        return producto;
    }

    public ProductoPedido producto(Producto producto) {
        this.producto = producto;
        return this;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public ProductoPedido pedido(Pedido pedido) {
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
        if (!(o instanceof ProductoPedido)) {
            return false;
        }
        return id != null && id.equals(((ProductoPedido) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProductoPedido{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            ", precioTotal=" + getPrecioTotal() +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
