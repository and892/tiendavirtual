package com.alfonsocortez.mitienda.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alfonsocortez.mitienda.web.rest.TestUtil;

public class FacturaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Factura.class);
        Factura factura1 = new Factura();
        factura1.setId(1L);
        Factura factura2 = new Factura();
        factura2.setId(factura1.getId());
        assertThat(factura1).isEqualTo(factura2);
        factura2.setId(2L);
        assertThat(factura1).isNotEqualTo(factura2);
        factura1.setId(null);
        assertThat(factura1).isNotEqualTo(factura2);
    }
}
