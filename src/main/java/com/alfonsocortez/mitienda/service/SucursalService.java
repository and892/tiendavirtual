package com.alfonsocortez.mitienda.service;

import com.alfonsocortez.mitienda.domain.Sucursal;
import com.alfonsocortez.mitienda.repository.SucursalRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Sucursal}.
 */
@Service
@Transactional
public class SucursalService {

    private final Logger log = LoggerFactory.getLogger(SucursalService.class);

    private final SucursalRepository sucursalRepository;

    public SucursalService(SucursalRepository sucursalRepository) {
        this.sucursalRepository = sucursalRepository;
    }

    /**
     * Save a sucursal.
     *
     * @param sucursal the entity to save.
     * @return the persisted entity.
     */
    public Sucursal save(Sucursal sucursal) {
        log.debug("Request to save Sucursal : {}", sucursal);
        return sucursalRepository.save(sucursal);
    }

    /**
     * Get all the sucursals.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Sucursal> findAll() {
        log.debug("Request to get all Sucursals");
        return sucursalRepository.findAll();
    }

    /**
     * Get one sucursal by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Sucursal> findOne(Long id) {
        log.debug("Request to get Sucursal : {}", id);
        return sucursalRepository.findById(id);
    }

    /**
     * Delete the sucursal by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Sucursal : {}", id);
        sucursalRepository.deleteById(id);
    }
}
