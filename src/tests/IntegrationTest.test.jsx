describe("Prueba de integración: Envío correcto de datos del formulario de pago a la API", () => {
  it("Debe enviar los datos del formulario correctamente a la API y manejar la respuesta", () => {
    // Interceptar la solicitud POST a la API
    cy.intercept("POST", "http://localhost:1238/order", (req) => {
      // Verificar que el objeto enviado contiene todos los campos requeridos
      expect(req.body).to.include.all.keys(
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

      // Verificar formato esperado de los campos
      expect(req.body.email).to.match(/^\S+@\S+\.\S+$/); // Formato de email
      expect(req.body.dni).to.match(/^\d{8}$/); // DNI de 8 dígitos
      expect(req.body.cellPhone).to.match(/^\d{9}$/); // Teléfono de 9 dígitos
    }).as("postCheckout");

    // Visitar la página del formulario
    cy.visit("http://localhost:5173/checkout");

    // Completar los campos del formulario con datos válidos
    cy.get('input[name="email"]').type("usuario@correo.com");
    cy.get('select[name="deliveryOption"]').select("Delivery Standard");
    cy.get('input[name="firstName"]').type("Jhunior");
    cy.get('input[name="lastName"]').type("Ccora");
    cy.get('input[name="dni"]').type("12345678");
    cy.get('input[name="address"]').type("Av. Principal 123");
    cy.get('select[name="department"]').select("Lima");
    cy.get('select[name="province"]').select("Lima");
    cy.get('select[name="district"]').select("Miraflores");
    cy.get('input[name="cellPhone"]').type("987654321");
    cy.get('select[name="paymentOption"]').select("Paypal");

    // Enviar el formulario
    cy.get("form").submit();

    // Verificar que la API devuelve una respuesta exitosa
    cy.wait("@postCheckout").then((interception) => {
      // Verificar que el backend respondió correctamente
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property("success", true);

      // Verificar el manejo de la respuesta en el frontend
      cy.get(".success-message").should(
        "contain.text",
        "¡Pago procesado exitosamente!"
      );
    });
  });
});
