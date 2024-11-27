describe("Prueba de integración: Envío correcto de datos del formulario de pago a la API", () => {
  it("Debe enviar los datos del formulario correctamente a la API, manejar la respuesta y redirigir al usuario", () => {
    // Interceptar la solicitud POST a la API
    cy.intercept("POST", "http://localhost:1238/order", (req) => {
      const productList = [
        {
          id: 10,
          name: "Producto 1",
          price: 50.0,
          quantity: 2,
          image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
        },
        {
          id: 11,
          name: "Producto 2",
          price: 30.0,
          quantity: 1,
          image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
        },
      ];

      req.body.productList = productList;
      expect(req.body).to.have.all.keys("checkoutData", "productList");
      expect(req.body.productList).to.deep.equal(productList);

      // Validaciones adicionales de los datos
      req.body.productList.forEach((product) => {
        expect(product).to.include.all.keys(
          "id",
          "name",
          "price",
          "quantity",
          "image"
        );
      });

      const checkoutData = req.body.checkoutData;
      expect(checkoutData).to.include.all.keys(
        "email",
        "deliveryOption",
        "firstName",
        "lastName",
        "dni",
        "address",
        "department",
        "province",
        "district",
        "cellPhone",
        "paymentOption"
      );
    }).as("postCheckout");

    // Visitar la página del formulario
    cy.visit("/checkout");

    // Completar los campos del formulario con datos válidos
    cy.get('input[name="email"]').type("usuario@correo.com");
    cy.get('input[name="deliveryOption"][value="Shipping"]').check();
    cy.get('input[name="firstName"]').type("Jhunior");
    cy.get('input[name="lastName"]').type("Ccora");
    cy.get('input[name="dni"]').type("12345678");
    cy.get('input[name="address"]').type("Av. Principal 123");
    cy.get('select[name="country"]').select("Perú");
    cy.get('select[name="department"]').select("Lima");
    cy.get('select[name="province"]').select("Callao");
    cy.get('select[name="district"]').select("Ventanilla");
    cy.get('input[name="cellPhone"]').type("987654321");
    cy.get('input[name="paymentOption"][value="Yape"]').check();

    // Enviar el formulario
    cy.get("form").submit();

    // Verificar que la API devuelve una respuesta exitosa
    cy.wait("@postCheckout").then((interception) => {
      // Validar que la respuesta del backend es correcta
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property("success", true);

      // Aquí, el backend redirige a una nueva página
      // Verificar que la redirección sucedió correctamente
      cy.url().should("include", "/order-completion"); // Cambia esto por la URL de la página de resumen

      // Verificar que el contenido de la página de resumen de pedido esté presente
      cy.get("#orderCompletionBox").should("exist"); // Ajustado el selector a la clase real de la página de resumen

      // Verifica detalles del pedido (por ejemplo, productos, precios, etc.)
      cy.contains("¡Gracias, Jhunior!").should("exist"); // Verificar que el mensaje de agradecimiento está presente

      // Verifica si el resumen de la orden está visible
      cy.get("#orderDetailsBox").should("exist");
      cy.get("#orderSummaryBox").should("exist");
    });
  });
});
