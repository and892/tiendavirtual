package com.alfonsocortez.mitienda.service;

import com.alfonsocortez.mitienda.domain.Envio;
import com.alfonsocortez.mitienda.repository.EnvioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Envio}.
 */
@Service
@Transactional
public class EnvioService {

    private final Logger log = LoggerFactory.getLogger(EnvioService.class);

    private final EnvioRepository envioRepository;

    public EnvioService(EnvioRepository envioRepository) {
        this.envioRepository = envioRepository;
    }

    /**
     * Save a envio.
     *
     * @param envio the entity to save.
     * @return the persisted entity.
     */
    public Envio save(Envio envio) {
        log.debug("Request to save Envio : {}", envio);
        return envioRepository.save(envio);
    }

    /**
     * Get all the envios.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Envio> findAll(Pageable pageable) {
        log.debug("Request to get all Envios");
        return envioRepository.findAll(pageable);
    }

    /**
     * Get one envio by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Envio> findOne(Long id) {
        log.debug("Request to get Envio : {}", id);
        return envioRepository.findById(id);
    }

    /**
     * Delete the envio by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Envio : {}", id);
        envioRepository.deleteById(id);
    }
}
