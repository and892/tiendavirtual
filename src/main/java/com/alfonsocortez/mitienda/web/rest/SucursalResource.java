package com.alfonsocortez.mitienda.web.rest;

import com.alfonsocortez.mitienda.domain.Sucursal;
import com.alfonsocortez.mitienda.service.SucursalService;
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
 * REST controller for managing {@link com.alfonsocortez.mitienda.domain.Sucursal}.
 */
@RestController
@RequestMapping("/api")
public class SucursalResource {

    private final Logger log = LoggerFactory.getLogger(SucursalResource.class);

    private static final String ENTITY_NAME = "sucursal";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SucursalService sucursalService;

    public SucursalResource(SucursalService sucursalService) {
        this.sucursalService = sucursalService;
    }

    /**
     * {@code POST  /sucursals} : Create a new sucursal.
     *
     * @param sucursal the sucursal to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sucursal, or with status {@code 400 (Bad Request)} if the sucursal has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sucursals")
    public ResponseEntity<Sucursal> createSucursal(@Valid @RequestBody Sucursal sucursal) throws URISyntaxException {
        log.debug("REST request to save Sucursal : {}", sucursal);
        if (sucursal.getId() != null) {
            throw new BadRequestAlertException("A new sucursal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sucursal result = sucursalService.save(sucursal);
        return ResponseEntity.created(new URI("/api/sucursals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sucursals} : Updates an existing sucursal.
     *
     * @param sucursal the sucursal to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sucursal,
     * or with status {@code 400 (Bad Request)} if the sucursal is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sucursal couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sucursals")
    public ResponseEntity<Sucursal> updateSucursal(@Valid @RequestBody Sucursal sucursal) throws URISyntaxException {
        log.debug("REST request to update Sucursal : {}", sucursal);
        if (sucursal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sucursal result = sucursalService.save(sucursal);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sucursal.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sucursals} : get all the sucursals.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sucursals in body.
     */
    @GetMapping("/sucursals")
    public List<Sucursal> getAllSucursals() {
        log.debug("REST request to get all Sucursals");
        return sucursalService.findAll();
    }

    /**
     * {@code GET  /sucursals/:id} : get the "id" sucursal.
     *
     * @param id the id of the sucursal to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sucursal, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sucursals/{id}")
    public ResponseEntity<Sucursal> getSucursal(@PathVariable Long id) {
        log.debug("REST request to get Sucursal : {}", id);
        Optional<Sucursal> sucursal = sucursalService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sucursal);
    }

    /**
     * {@code DELETE  /sucursals/:id} : delete the "id" sucursal.
     *
     * @param id the id of the sucursal to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sucursals/{id}")
    public ResponseEntity<Void> deleteSucursal(@PathVariable Long id) {
        log.debug("REST request to delete Sucursal : {}", id);
        sucursalService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
