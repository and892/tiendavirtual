package com.alfonsocortez.mitienda.service;

import com.alfonsocortez.mitienda.domain.ProductoPedido;
import com.alfonsocortez.mitienda.repository.ProductoPedidoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ProductoPedido}.
 */
@Service
@Transactional
public class ProductoPedidoService {

    private final Logger log = LoggerFactory.getLogger(ProductoPedidoService.class);

    private final ProductoPedidoRepository productoPedidoRepository;

    public ProductoPedidoService(ProductoPedidoRepository productoPedidoRepository) {
        this.productoPedidoRepository = productoPedidoRepository;
    }

    /**
     * Save a productoPedido.
     *
     * @param productoPedido the entity to save.
     * @return the persisted entity.
     */
    public ProductoPedido save(ProductoPedido productoPedido) {
        log.debug("Request to save ProductoPedido : {}", productoPedido);
        return productoPedidoRepository.save(productoPedido);
    }

    /**
     * Get all the productoPedidos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ProductoPedido> findAll(Pageable pageable) {
        log.debug("Request to get all ProductoPedidos");
        return productoPedidoRepository.findAll(pageable);
    }

    /**
     * Get one productoPedido by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProductoPedido> findOne(Long id) {
        log.debug("Request to get ProductoPedido : {}", id);
        return productoPedidoRepository.findById(id);
    }

    /**
     * Delete the productoPedido by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ProductoPedido : {}", id);
        productoPedidoRepository.deleteById(id);
    }
}
