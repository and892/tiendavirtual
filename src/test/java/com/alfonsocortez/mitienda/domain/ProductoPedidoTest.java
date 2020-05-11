package com.alfonsocortez.mitienda.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alfonsocortez.mitienda.web.rest.TestUtil;

public class ProductoPedidoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductoPedido.class);
        ProductoPedido productoPedido1 = new ProductoPedido();
        productoPedido1.setId(1L);
        ProductoPedido productoPedido2 = new ProductoPedido();
        productoPedido2.setId(productoPedido1.getId());
        assertThat(productoPedido1).isEqualTo(productoPedido2);
        productoPedido2.setId(2L);
        assertThat(productoPedido1).isNotEqualTo(productoPedido2);
        productoPedido1.setId(null);
        assertThat(productoPedido1).isNotEqualTo(productoPedido2);
    }
}
