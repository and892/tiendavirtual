package com.alfonsocortez.mitienda.web.rest;

import com.alfonsocortez.mitienda.TiendavirtualApp;
import com.alfonsocortez.mitienda.domain.Sucursal;
import com.alfonsocortez.mitienda.repository.SucursalRepository;
import com.alfonsocortez.mitienda.service.SucursalService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SucursalResource} REST controller.
 */
@SpringBootTest(classes = TiendavirtualApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class SucursalResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    @Autowired
    private SucursalRepository sucursalRepository;

    @Autowired
    private SucursalService sucursalService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSucursalMockMvc;

    private Sucursal sucursal;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sucursal createEntity(EntityManager em) {
        Sucursal sucursal = new Sucursal()
            .nombre(DEFAULT_NOMBRE)
            .direccion(DEFAULT_DIRECCION);
        return sucursal;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sucursal createUpdatedEntity(EntityManager em) {
        Sucursal sucursal = new Sucursal()
            .nombre(UPDATED_NOMBRE)
            .direccion(UPDATED_DIRECCION);
        return sucursal;
    }

    @BeforeEach
    public void initTest() {
        sucursal = createEntity(em);
    }

    @Test
    @Transactional
    public void createSucursal() throws Exception {
        int databaseSizeBeforeCreate = sucursalRepository.findAll().size();

        // Create the Sucursal
        restSucursalMockMvc.perform(post("/api/sucursals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sucursal)))
            .andExpect(status().isCreated());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeCreate + 1);
        Sucursal testSucursal = sucursalList.get(sucursalList.size() - 1);
        assertThat(testSucursal.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testSucursal.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
    }

    @Test
    @Transactional
    public void createSucursalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sucursalRepository.findAll().size();

        // Create the Sucursal with an existing ID
        sucursal.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSucursalMockMvc.perform(post("/api/sucursals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sucursal)))
            .andExpect(status().isBadRequest());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = sucursalRepository.findAll().size();
        // set the field null
        sucursal.setNombre(null);

        // Create the Sucursal, which fails.

        restSucursalMockMvc.perform(post("/api/sucursals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sucursal)))
            .andExpect(status().isBadRequest());

        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDireccionIsRequired() throws Exception {
        int databaseSizeBeforeTest = sucursalRepository.findAll().size();
        // set the field null
        sucursal.setDireccion(null);

        // Create the Sucursal, which fails.

        restSucursalMockMvc.perform(post("/api/sucursals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sucursal)))
            .andExpect(status().isBadRequest());

        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSucursals() throws Exception {
        // Initialize the database
        sucursalRepository.saveAndFlush(sucursal);

        // Get all the sucursalList
        restSucursalMockMvc.perform(get("/api/sucursals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sucursal.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION)));
    }
    
    @Test
    @Transactional
    public void getSucursal() throws Exception {
        // Initialize the database
        sucursalRepository.saveAndFlush(sucursal);

        // Get the sucursal
        restSucursalMockMvc.perform(get("/api/sucursals/{id}", sucursal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sucursal.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION));
    }

    @Test
    @Transactional
    public void getNonExistingSucursal() throws Exception {
        // Get the sucursal
        restSucursalMockMvc.perform(get("/api/sucursals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSucursal() throws Exception {
        // Initialize the database
        sucursalService.save(sucursal);

        int databaseSizeBeforeUpdate = sucursalRepository.findAll().size();

        // Update the sucursal
        Sucursal updatedSucursal = sucursalRepository.findById(sucursal.getId()).get();
        // Disconnect from session so that the updates on updatedSucursal are not directly saved in db
        em.detach(updatedSucursal);
        updatedSucursal
            .nombre(UPDATED_NOMBRE)
            .direccion(UPDATED_DIRECCION);

        restSucursalMockMvc.perform(put("/api/sucursals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSucursal)))
            .andExpect(status().isOk());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeUpdate);
        Sucursal testSucursal = sucursalList.get(sucursalList.size() - 1);
        assertThat(testSucursal.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testSucursal.getDireccion()).isEqualTo(UPDATED_DIRECCION);
    }

    @Test
    @Transactional
    public void updateNonExistingSucursal() throws Exception {
        int databaseSizeBeforeUpdate = sucursalRepository.findAll().size();

        // Create the Sucursal

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSucursalMockMvc.perform(put("/api/sucursals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sucursal)))
            .andExpect(status().isBadRequest());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSucursal() throws Exception {
        // Initialize the database
        sucursalService.save(sucursal);

        int databaseSizeBeforeDelete = sucursalRepository.findAll().size();

        // Delete the sucursal
        restSucursalMockMvc.perform(delete("/api/sucursals/{id}", sucursal.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
