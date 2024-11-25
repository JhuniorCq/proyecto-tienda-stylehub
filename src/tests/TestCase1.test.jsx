import { describe, it, expect } from "vitest";
import { validateInputCheckout } from "../utils/validations/checkoutValidations";
import { INPUT_NAMES } from "../utils/constants";
import { DEFAULT_SELECT_VALUE } from "../utils/constants";
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from "../pages/Checkout/constants";

describe("validateInputCheckout", () => {
  const validValues = {
    [INPUT_NAMES.EMAIL]: "usuario@correo.com",
    [INPUT_NAMES.DELIVERY_OPTION]: DELIVERY_OPTIONS[0].text,
    [INPUT_NAMES.COUNTRY]: "Perú",
    [INPUT_NAMES.FIRST_NAME]: "Jhunior",
    [INPUT_NAMES.LAST_NAME]: "Ccora",
    [INPUT_NAMES.DNI]: "12345678",
    [INPUT_NAMES.ADDRESS]: "Av. Principal 123",
    [INPUT_NAMES.DEPARTMENT]: "Lima",
    [INPUT_NAMES.PROVINCE]: "Lima",
    [INPUT_NAMES.DISTRICT]: "Miraflores",
    [INPUT_NAMES.CELL_PHONE]: "987654321",
    [INPUT_NAMES.PAYMENT_OPTION]: PAYMENT_OPTIONS[0].text,
  };

  // Correo
  it("Debería validar un email válido", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.EMAIL,
      value: validValues[INPUT_NAMES.EMAIL],
    });
    expect(result.success).toBe(true);
  });

  it("Debería fallar si el email es inválido", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.EMAIL,
      value: "correo_invalido",
    });
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe("Invalid email");
  });

  // Opción de Entrega
  it("Debería validar una opción de entrega válida", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.DELIVERY_OPTION,
      value: DELIVERY_OPTIONS[0].text,
    });
    expect(result.success).toBe(true);
  });

  it("Debería fallar si la opción de entrega no es válida", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.DELIVERY_OPTION,
      value: "Opción inválida",
    });
    expect(result.success).toBe(false);
  });

  // País
  it("Debería validar un país válido", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.COUNTRY,
      value: validValues[INPUT_NAMES.COUNTRY],
    });
    expect(result.success).toBe(true);
  });

  it("Debería fallar si el país es inválido", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.COUNTRY,
      value: DEFAULT_SELECT_VALUE,
    });
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe(
      "El país seleccionado no es válido."
    );
  });

  // Nombres
  it("Debería validar nombres válidos", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.FIRST_NAME,
      value: validValues[INPUT_NAMES.FIRST_NAME],
    });
    expect(result.success).toBe(true);
  });

  it("Debería fallar si el campo nombres está vacío", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.FIRST_NAME,
      value: "",
    });
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe(
      "El campo para los nombres no debe estar vacío."
    );
  });

  // Apellidos
  it("Debería validar un apellido válido", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.LAST_NAME,
      value: validValues[INPUT_NAMES.LAST_NAME],
    });
    expect(result.success).toBe(true);
  });

  it("Debería fallar si el campo apellidos está vacío", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.LAST_NAME,
      value: "",
    });
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe(
      "El campo para los apellidos no debe estar vacío."
    );
  });

  // Dirección
  it("Debería validar una dirección válida", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.ADDRESS,
      value: validValues[INPUT_NAMES.ADDRESS],
    });
    expect(result.success).toBe(true);
  });

  it("Debería fallar si la dirección está vacía", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.ADDRESS,
      value: "",
    });
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe(
      "El campo para la dirección no debe estar vacío."
    );
  });

  // DNI
  it("Debería validar un DNI válido", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.DNI,
      value: validValues[INPUT_NAMES.DNI],
    });
    expect(result.success).toBe(true);
  });

  it("Debería fallar si el DNI no tiene 8 dígitos", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.DNI,
      value: "12345", // Menos de 8 dígitos
    });
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe(
      "El DNI debe tener 8 dígitos números."
    );
  });

  it("Debería fallar si el DNI contiene caracteres no numéricos", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.DNI,
      value: "1234abcd",
    });
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe(
      "El DNI debe tener 8 dígitos números."
    );
  });

  // Departamento
  it("Debería validar un departamento válido", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.DEPARTMENT,
      value: validValues[INPUT_NAMES.DEPARTMENT],
    });
    expect(result.success).toBe(true);
  });

  it("Debería fallar si el departamento es inválido", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.DEPARTMENT,
      value: DEFAULT_SELECT_VALUE,
    });
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe(
      "El departamento seleccionado no es válido."
    );
  });

  // Provincia
  it("Debería validar una provincia válida", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.PROVINCE,
      value: validValues[INPUT_NAMES.PROVINCE],
    });
    expect(result.success).toBe(true);
  });

  it("Debería fallar si la provincia es inválida", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.PROVINCE,
      value: DEFAULT_SELECT_VALUE,
    });
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe(
      "La provincia seleccionado no es válida."
    );
  });

  // Distrito
  it("Debería validar un distrito válido", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.DISTRICT,
      value: validValues[INPUT_NAMES.DISTRICT],
    });
    expect(result.success).toBe(true);
  });

  it("Debería fallar si el distrito es inválido", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.DISTRICT,
      value: DEFAULT_SELECT_VALUE,
    });
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe(
      "El distrito seleccionado no es válido."
    );
  });

  // Número de Celular
  it("Debería validar un número de celular válido", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.CELL_PHONE,
      value: validValues[INPUT_NAMES.CELL_PHONE],
    });
    expect(result.success).toBe(true);
  });

  it("Debería fallar si el número de celular no tiene 9 dígitos", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.CELL_PHONE,
      value: "1234567", // Menos de 9 dígitos
    });
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe(
      "El número de celular debe tener 9 dígitos números."
    );
  });

  it("Debería fallar si el número de celular contiene caracteres no numéricos", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.CELL_PHONE,
      value: "98765abcd",
    });
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe(
      "El número de celular debe tener 9 dígitos números."
    );
  });

  // Opción de Pago
  it("Debería validar una opción de pago válida", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.PAYMENT_OPTION,
      value: PAYMENT_OPTIONS[0].text,
    });
    expect(result.success).toBe(true);
  });

  it("Debería fallar si la opción de pago es inválida", () => {
    const result = validateInputCheckout({
      name: INPUT_NAMES.PAYMENT_OPTION,
      value: "Opción inválida",
    });
    expect(result.success).toBe(false);
  });
});
