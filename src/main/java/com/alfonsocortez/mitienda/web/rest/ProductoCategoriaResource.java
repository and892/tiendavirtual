package com.alfonsocortez.mitienda.web.rest;

import com.alfonsocortez.mitienda.domain.ProductoCategoria;
import com.alfonsocortez.mitienda.service.ProductoCategoriaService;
import com.alfonsocortez.mitienda.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.alfonsocortez.mitienda.domain.ProductoCategoria}.
 */
@RestController
@RequestMapping("/api")
public class ProductoCategoriaResource {

    private final Logger log = LoggerFactory.getLogger(ProductoCategoriaResource.class);

    private static final String ENTITY_NAME = "productoCategoria";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductoCategoriaService productoCategoriaService;

    public ProductoCategoriaResource(ProductoCategoriaService productoCategoriaService) {
        this.productoCategoriaService = productoCategoriaService;
    }

    /**
     * {@code POST  /producto-categorias} : Create a new productoCategoria.
     *
     * @param productoCategoria the productoCategoria to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productoCategoria, or with status {@code 400 (Bad Request)} if the productoCategoria has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/producto-categorias")
    public ResponseEntity<ProductoCategoria> createProductoCategoria(@Valid @RequestBody ProductoCategoria productoCategoria) throws URISyntaxException {
        log.debug("REST request to save ProductoCategoria : {}", productoCategoria);
        if (productoCategoria.getId() != null) {
            throw new BadRequestAlertException("A new productoCategoria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductoCategoria result = productoCategoriaService.save(productoCategoria);
        return ResponseEntity.created(new URI("/api/producto-categorias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /producto-categorias} : Updates an existing productoCategoria.
     *
     * @param productoCategoria the productoCategoria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productoCategoria,
     * or with status {@code 400 (Bad Request)} if the productoCategoria is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productoCategoria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/producto-categorias")
    public ResponseEntity<ProductoCategoria> updateProductoCategoria(@Valid @RequestBody ProductoCategoria productoCategoria) throws URISyntaxException {
        log.debug("REST request to update ProductoCategoria : {}", productoCategoria);
        if (productoCategoria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductoCategoria result = productoCategoriaService.save(productoCategoria);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productoCategoria.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /producto-categorias} : get all the productoCategorias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productoCategorias in body.
     */
    @GetMapping("/producto-categorias")
    public List<ProductoCategoria> getAllProductoCategorias() {
        log.debug("REST request to get all ProductoCategorias");
        return productoCategoriaService.findAll();
    }

    /**
     * {@code GET  /producto-categorias/:id} : get the "id" productoCategoria.
     *
     * @param id the id of the productoCategoria to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productoCategoria, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/producto-categorias/{id}")
    public ResponseEntity<ProductoCategoria> getProductoCategoria(@PathVariable Long id) {
        log.debug("REST request to get ProductoCategoria : {}", id);
        Optional<ProductoCategoria> productoCategoria = productoCategoriaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productoCategoria);
    }

    /**
     * {@code DELETE  /producto-categorias/:id} : delete the "id" productoCategoria.
     *
     * @param id the id of the productoCategoria to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/producto-categorias/{id}")
    public ResponseEntity<Void> deleteProductoCategoria(@PathVariable Long id) {
        log.debug("REST request to delete ProductoCategoria : {}", id);
        productoCategoriaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
