package com.alfonsocortez.mitienda.web.rest;

import com.alfonsocortez.mitienda.domain.ProductoPedido;
import com.alfonsocortez.mitienda.service.ProductoPedidoService;
import com.alfonsocortez.mitienda.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.alfonsocortez.mitienda.domain.ProductoPedido}.
 */
@RestController
@RequestMapping("/api")
public class ProductoPedidoResource {

    private final Logger log = LoggerFactory.getLogger(ProductoPedidoResource.class);

    private static final String ENTITY_NAME = "productoPedido";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductoPedidoService productoPedidoService;

    public ProductoPedidoResource(ProductoPedidoService productoPedidoService) {
        this.productoPedidoService = productoPedidoService;
    }

    /**
     * {@code POST  /producto-pedidos} : Create a new productoPedido.
     *
     * @param productoPedido the productoPedido to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productoPedido, or with status {@code 400 (Bad Request)} if the productoPedido has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/producto-pedidos")
    public ResponseEntity<ProductoPedido> createProductoPedido(@Valid @RequestBody ProductoPedido productoPedido) throws URISyntaxException {
        log.debug("REST request to save ProductoPedido : {}", productoPedido);
        if (productoPedido.getId() != null) {
            throw new BadRequestAlertException("A new productoPedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductoPedido result = productoPedidoService.save(productoPedido);
        return ResponseEntity.created(new URI("/api/producto-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /producto-pedidos} : Updates an existing productoPedido.
     *
     * @param productoPedido the productoPedido to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productoPedido,
     * or with status {@code 400 (Bad Request)} if the productoPedido is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productoPedido couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/producto-pedidos")
    public ResponseEntity<ProductoPedido> updateProductoPedido(@Valid @RequestBody ProductoPedido productoPedido) throws URISyntaxException {
        log.debug("REST request to update ProductoPedido : {}", productoPedido);
        if (productoPedido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductoPedido result = productoPedidoService.save(productoPedido);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productoPedido.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /producto-pedidos} : get all the productoPedidos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productoPedidos in body.
     */
    @GetMapping("/producto-pedidos")
    public ResponseEntity<List<ProductoPedido>> getAllProductoPedidos(Pageable pageable) {
        log.debug("REST request to get a page of ProductoPedidos");
        Page<ProductoPedido> page = productoPedidoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /producto-pedidos/:id} : get the "id" productoPedido.
     *
     * @param id the id of the productoPedido to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productoPedido, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/producto-pedidos/{id}")
    public ResponseEntity<ProductoPedido> getProductoPedido(@PathVariable Long id) {
        log.debug("REST request to get ProductoPedido : {}", id);
        Optional<ProductoPedido> productoPedido = productoPedidoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productoPedido);
    }

    /**
     * {@code DELETE  /producto-pedidos/:id} : delete the "id" productoPedido.
     *
     * @param id the id of the productoPedido to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/producto-pedidos/{id}")
    public ResponseEntity<Void> deleteProductoPedido(@PathVariable Long id) {
        log.debug("REST request to delete ProductoPedido : {}", id);
        productoPedidoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
