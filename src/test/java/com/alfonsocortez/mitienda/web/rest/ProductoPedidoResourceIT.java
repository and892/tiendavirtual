package com.alfonsocortez.mitienda.web.rest;

import com.alfonsocortez.mitienda.TiendavirtualApp;
import com.alfonsocortez.mitienda.domain.ProductoPedido;
import com.alfonsocortez.mitienda.domain.Producto;
import com.alfonsocortez.mitienda.repository.ProductoPedidoRepository;
import com.alfonsocortez.mitienda.service.ProductoPedidoService;

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
import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.alfonsocortez.mitienda.domain.enumeration.ProductoPedidoEstado;
/**
 * Integration tests for the {@link ProductoPedidoResource} REST controller.
 */
@SpringBootTest(classes = TiendavirtualApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ProductoPedidoResourceIT {

    private static final Integer DEFAULT_CANTIDAD = 0;
    private static final Integer UPDATED_CANTIDAD = 1;

    private static final BigDecimal DEFAULT_PRECIO_TOTAL = new BigDecimal(0);
    private static final BigDecimal UPDATED_PRECIO_TOTAL = new BigDecimal(1);

    private static final ProductoPedidoEstado DEFAULT_ESTADO = ProductoPedidoEstado.DISPONIBLE;
    private static final ProductoPedidoEstado UPDATED_ESTADO = ProductoPedidoEstado.AGOTADO;

    @Autowired
    private ProductoPedidoRepository productoPedidoRepository;

    @Autowired
    private ProductoPedidoService productoPedidoService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProductoPedidoMockMvc;

    private ProductoPedido productoPedido;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductoPedido createEntity(EntityManager em) {
        ProductoPedido productoPedido = new ProductoPedido()
            .cantidad(DEFAULT_CANTIDAD)
            .precioTotal(DEFAULT_PRECIO_TOTAL)
            .estado(DEFAULT_ESTADO);
        // Add required entity
        Producto producto;
        if (TestUtil.findAll(em, Producto.class).isEmpty()) {
            producto = ProductoResourceIT.createEntity(em);
            em.persist(producto);
            em.flush();
        } else {
            producto = TestUtil.findAll(em, Producto.class).get(0);
        }
        productoPedido.setProducto(producto);
        return productoPedido;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductoPedido createUpdatedEntity(EntityManager em) {
        ProductoPedido productoPedido = new ProductoPedido()
            .cantidad(UPDATED_CANTIDAD)
            .precioTotal(UPDATED_PRECIO_TOTAL)
            .estado(UPDATED_ESTADO);
        // Add required entity
        Producto producto;
        if (TestUtil.findAll(em, Producto.class).isEmpty()) {
            producto = ProductoResourceIT.createUpdatedEntity(em);
            em.persist(producto);
            em.flush();
        } else {
            producto = TestUtil.findAll(em, Producto.class).get(0);
        }
        productoPedido.setProducto(producto);
        return productoPedido;
    }

    @BeforeEach
    public void initTest() {
        productoPedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductoPedido() throws Exception {
        int databaseSizeBeforeCreate = productoPedidoRepository.findAll().size();

        // Create the ProductoPedido
        restProductoPedidoMockMvc.perform(post("/api/producto-pedidos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoPedido)))
            .andExpect(status().isCreated());

        // Validate the ProductoPedido in the database
        List<ProductoPedido> productoPedidoList = productoPedidoRepository.findAll();
        assertThat(productoPedidoList).hasSize(databaseSizeBeforeCreate + 1);
        ProductoPedido testProductoPedido = productoPedidoList.get(productoPedidoList.size() - 1);
        assertThat(testProductoPedido.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testProductoPedido.getPrecioTotal()).isEqualTo(DEFAULT_PRECIO_TOTAL);
        assertThat(testProductoPedido.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    public void createProductoPedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productoPedidoRepository.findAll().size();

        // Create the ProductoPedido with an existing ID
        productoPedido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductoPedidoMockMvc.perform(post("/api/producto-pedidos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoPedido)))
            .andExpect(status().isBadRequest());

        // Validate the ProductoPedido in the database
        List<ProductoPedido> productoPedidoList = productoPedidoRepository.findAll();
        assertThat(productoPedidoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCantidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoPedidoRepository.findAll().size();
        // set the field null
        productoPedido.setCantidad(null);

        // Create the ProductoPedido, which fails.

        restProductoPedidoMockMvc.perform(post("/api/producto-pedidos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoPedido)))
            .andExpect(status().isBadRequest());

        List<ProductoPedido> productoPedidoList = productoPedidoRepository.findAll();
        assertThat(productoPedidoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrecioTotalIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoPedidoRepository.findAll().size();
        // set the field null
        productoPedido.setPrecioTotal(null);

        // Create the ProductoPedido, which fails.

        restProductoPedidoMockMvc.perform(post("/api/producto-pedidos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoPedido)))
            .andExpect(status().isBadRequest());

        List<ProductoPedido> productoPedidoList = productoPedidoRepository.findAll();
        assertThat(productoPedidoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductoPedidos() throws Exception {
        // Initialize the database
        productoPedidoRepository.saveAndFlush(productoPedido);

        // Get all the productoPedidoList
        restProductoPedidoMockMvc.perform(get("/api/producto-pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productoPedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)))
            .andExpect(jsonPath("$.[*].precioTotal").value(hasItem(DEFAULT_PRECIO_TOTAL.intValue())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())));
    }
    
    @Test
    @Transactional
    public void getProductoPedido() throws Exception {
        // Initialize the database
        productoPedidoRepository.saveAndFlush(productoPedido);

        // Get the productoPedido
        restProductoPedidoMockMvc.perform(get("/api/producto-pedidos/{id}", productoPedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(productoPedido.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD))
            .andExpect(jsonPath("$.precioTotal").value(DEFAULT_PRECIO_TOTAL.intValue()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProductoPedido() throws Exception {
        // Get the productoPedido
        restProductoPedidoMockMvc.perform(get("/api/producto-pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductoPedido() throws Exception {
        // Initialize the database
        productoPedidoService.save(productoPedido);

        int databaseSizeBeforeUpdate = productoPedidoRepository.findAll().size();

        // Update the productoPedido
        ProductoPedido updatedProductoPedido = productoPedidoRepository.findById(productoPedido.getId()).get();
        // Disconnect from session so that the updates on updatedProductoPedido are not directly saved in db
        em.detach(updatedProductoPedido);
        updatedProductoPedido
            .cantidad(UPDATED_CANTIDAD)
            .precioTotal(UPDATED_PRECIO_TOTAL)
            .estado(UPDATED_ESTADO);

        restProductoPedidoMockMvc.perform(put("/api/producto-pedidos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductoPedido)))
            .andExpect(status().isOk());

        // Validate the ProductoPedido in the database
        List<ProductoPedido> productoPedidoList = productoPedidoRepository.findAll();
        assertThat(productoPedidoList).hasSize(databaseSizeBeforeUpdate);
        ProductoPedido testProductoPedido = productoPedidoList.get(productoPedidoList.size() - 1);
        assertThat(testProductoPedido.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testProductoPedido.getPrecioTotal()).isEqualTo(UPDATED_PRECIO_TOTAL);
        assertThat(testProductoPedido.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingProductoPedido() throws Exception {
        int databaseSizeBeforeUpdate = productoPedidoRepository.findAll().size();

        // Create the ProductoPedido

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductoPedidoMockMvc.perform(put("/api/producto-pedidos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoPedido)))
            .andExpect(status().isBadRequest());

        // Validate the ProductoPedido in the database
        List<ProductoPedido> productoPedidoList = productoPedidoRepository.findAll();
        assertThat(productoPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductoPedido() throws Exception {
        // Initialize the database
        productoPedidoService.save(productoPedido);

        int databaseSizeBeforeDelete = productoPedidoRepository.findAll().size();

        // Delete the productoPedido
        restProductoPedidoMockMvc.perform(delete("/api/producto-pedidos/{id}", productoPedido.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductoPedido> productoPedidoList = productoPedidoRepository.findAll();
        assertThat(productoPedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
