package com.alfonsocortez.mitienda.web.rest;

import com.alfonsocortez.mitienda.domain.Envio;
import com.alfonsocortez.mitienda.service.EnvioService;
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
 * REST controller for managing {@link com.alfonsocortez.mitienda.domain.Envio}.
 */
@RestController
@RequestMapping("/api")
public class EnvioResource {

    private final Logger log = LoggerFactory.getLogger(EnvioResource.class);

    private static final String ENTITY_NAME = "envio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EnvioService envioService;

    public EnvioResource(EnvioService envioService) {
        this.envioService = envioService;
    }

    /**
     * {@code POST  /envios} : Create a new envio.
     *
     * @param envio the envio to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new envio, or with status {@code 400 (Bad Request)} if the envio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/envios")
    public ResponseEntity<Envio> createEnvio(@Valid @RequestBody Envio envio) throws URISyntaxException {
        log.debug("REST request to save Envio : {}", envio);
        if (envio.getId() != null) {
            throw new BadRequestAlertException("A new envio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Envio result = envioService.save(envio);
        return ResponseEntity.created(new URI("/api/envios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /envios} : Updates an existing envio.
     *
     * @param envio the envio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated envio,
     * or with status {@code 400 (Bad Request)} if the envio is not valid,
     * or with status {@code 500 (Internal Server Error)} if the envio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/envios")
    public ResponseEntity<Envio> updateEnvio(@Valid @RequestBody Envio envio) throws URISyntaxException {
        log.debug("REST request to update Envio : {}", envio);
        if (envio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Envio result = envioService.save(envio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, envio.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /envios} : get all the envios.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of envios in body.
     */
    @GetMapping("/envios")
    public ResponseEntity<List<Envio>> getAllEnvios(Pageable pageable) {
        log.debug("REST request to get a page of Envios");
        Page<Envio> page = envioService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /envios/:id} : get the "id" envio.
     *
     * @param id the id of the envio to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the envio, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/envios/{id}")
    public ResponseEntity<Envio> getEnvio(@PathVariable Long id) {
        log.debug("REST request to get Envio : {}", id);
        Optional<Envio> envio = envioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(envio);
    }

    /**
     * {@code DELETE  /envios/:id} : delete the "id" envio.
     *
     * @param id the id of the envio to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/envios/{id}")
    public ResponseEntity<Void> deleteEnvio(@PathVariable Long id) {
        log.debug("REST request to delete Envio : {}", id);
        envioService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
