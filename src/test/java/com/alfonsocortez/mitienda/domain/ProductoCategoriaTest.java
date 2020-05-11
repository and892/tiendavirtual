package com.alfonsocortez.mitienda.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alfonsocortez.mitienda.web.rest.TestUtil;

public class ProductoCategoriaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductoCategoria.class);
        ProductoCategoria productoCategoria1 = new ProductoCategoria();
        productoCategoria1.setId(1L);
        ProductoCategoria productoCategoria2 = new ProductoCategoria();
        productoCategoria2.setId(productoCategoria1.getId());
        assertThat(productoCategoria1).isEqualTo(productoCategoria2);
        productoCategoria2.setId(2L);
        assertThat(productoCategoria1).isNotEqualTo(productoCategoria2);
        productoCategoria1.setId(null);
        assertThat(productoCategoria1).isNotEqualTo(productoCategoria2);
    }
}
