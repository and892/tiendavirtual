package com.alfonsocortez.mitienda.web.rest;

import com.alfonsocortez.mitienda.TiendavirtualApp;
import com.alfonsocortez.mitienda.domain.ProductoCategoria;
import com.alfonsocortez.mitienda.repository.ProductoCategoriaRepository;
import com.alfonsocortez.mitienda.service.ProductoCategoriaService;

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
 * Integration tests for the {@link ProductoCategoriaResource} REST controller.
 */
@SpringBootTest(classes = TiendavirtualApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ProductoCategoriaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private ProductoCategoriaRepository productoCategoriaRepository;

    @Autowired
    private ProductoCategoriaService productoCategoriaService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProductoCategoriaMockMvc;

    private ProductoCategoria productoCategoria;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductoCategoria createEntity(EntityManager em) {
        ProductoCategoria productoCategoria = new ProductoCategoria()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION);
        return productoCategoria;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductoCategoria createUpdatedEntity(EntityManager em) {
        ProductoCategoria productoCategoria = new ProductoCategoria()
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);
        return productoCategoria;
    }

    @BeforeEach
    public void initTest() {
        productoCategoria = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductoCategoria() throws Exception {
        int databaseSizeBeforeCreate = productoCategoriaRepository.findAll().size();

        // Create the ProductoCategoria
        restProductoCategoriaMockMvc.perform(post("/api/producto-categorias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoCategoria)))
            .andExpect(status().isCreated());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeCreate + 1);
        ProductoCategoria testProductoCategoria = productoCategoriaList.get(productoCategoriaList.size() - 1);
        assertThat(testProductoCategoria.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testProductoCategoria.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createProductoCategoriaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productoCategoriaRepository.findAll().size();

        // Create the ProductoCategoria with an existing ID
        productoCategoria.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductoCategoriaMockMvc.perform(post("/api/producto-categorias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoCategoria)))
            .andExpect(status().isBadRequest());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoCategoriaRepository.findAll().size();
        // set the field null
        productoCategoria.setNombre(null);

        // Create the ProductoCategoria, which fails.

        restProductoCategoriaMockMvc.perform(post("/api/producto-categorias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoCategoria)))
            .andExpect(status().isBadRequest());

        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductoCategorias() throws Exception {
        // Initialize the database
        productoCategoriaRepository.saveAndFlush(productoCategoria);

        // Get all the productoCategoriaList
        restProductoCategoriaMockMvc.perform(get("/api/producto-categorias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productoCategoria.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getProductoCategoria() throws Exception {
        // Initialize the database
        productoCategoriaRepository.saveAndFlush(productoCategoria);

        // Get the productoCategoria
        restProductoCategoriaMockMvc.perform(get("/api/producto-categorias/{id}", productoCategoria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(productoCategoria.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }

    @Test
    @Transactional
    public void getNonExistingProductoCategoria() throws Exception {
        // Get the productoCategoria
        restProductoCategoriaMockMvc.perform(get("/api/producto-categorias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductoCategoria() throws Exception {
        // Initialize the database
        productoCategoriaService.save(productoCategoria);

        int databaseSizeBeforeUpdate = productoCategoriaRepository.findAll().size();

        // Update the productoCategoria
        ProductoCategoria updatedProductoCategoria = productoCategoriaRepository.findById(productoCategoria.getId()).get();
        // Disconnect from session so that the updates on updatedProductoCategoria are not directly saved in db
        em.detach(updatedProductoCategoria);
        updatedProductoCategoria
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);

        restProductoCategoriaMockMvc.perform(put("/api/producto-categorias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductoCategoria)))
            .andExpect(status().isOk());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeUpdate);
        ProductoCategoria testProductoCategoria = productoCategoriaList.get(productoCategoriaList.size() - 1);
        assertThat(testProductoCategoria.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testProductoCategoria.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingProductoCategoria() throws Exception {
        int databaseSizeBeforeUpdate = productoCategoriaRepository.findAll().size();

        // Create the ProductoCategoria

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductoCategoriaMockMvc.perform(put("/api/producto-categorias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoCategoria)))
            .andExpect(status().isBadRequest());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductoCategoria() throws Exception {
        // Initialize the database
        productoCategoriaService.save(productoCategoria);

        int databaseSizeBeforeDelete = productoCategoriaRepository.findAll().size();

        // Delete the productoCategoria
        restProductoCategoriaMockMvc.perform(delete("/api/producto-categorias/{id}", productoCategoria.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
