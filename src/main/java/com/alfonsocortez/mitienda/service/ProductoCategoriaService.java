package com.alfonsocortez.mitienda.service;

import com.alfonsocortez.mitienda.domain.ProductoCategoria;
import com.alfonsocortez.mitienda.repository.ProductoCategoriaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link ProductoCategoria}.
 */
@Service
@Transactional
public class ProductoCategoriaService {

    private final Logger log = LoggerFactory.getLogger(ProductoCategoriaService.class);

    private final ProductoCategoriaRepository productoCategoriaRepository;

    public ProductoCategoriaService(ProductoCategoriaRepository productoCategoriaRepository) {
        this.productoCategoriaRepository = productoCategoriaRepository;
    }

    /**
     * Save a productoCategoria.
     *
     * @param productoCategoria the entity to save.
     * @return the persisted entity.
     */
    public ProductoCategoria save(ProductoCategoria productoCategoria) {
        log.debug("Request to save ProductoCategoria : {}", productoCategoria);
        return productoCategoriaRepository.save(productoCategoria);
    }

    /**
     * Get all the productoCategorias.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ProductoCategoria> findAll() {
        log.debug("Request to get all ProductoCategorias");
        return productoCategoriaRepository.findAll();
    }

    /**
     * Get one productoCategoria by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProductoCategoria> findOne(Long id) {
        log.debug("Request to get ProductoCategoria : {}", id);
        return productoCategoriaRepository.findById(id);
    }

    /**
     * Delete the productoCategoria by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ProductoCategoria : {}", id);
        productoCategoriaRepository.deleteById(id);
    }
}
