package com.alfonsocortez.mitienda.repository;

import com.alfonsocortez.mitienda.domain.ProductoPedido;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProductoPedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductoPedidoRepository extends JpaRepository<ProductoPedido, Long> {
}
