import { z } from "zod";
import { INPUT_NAMES } from "../constants";

const checkoutSchema = z.object({
  email: z
    .string({ message: "El email debe ser una cadena de texto." })
    .email(),
  deliveryOption: z.string(),
  country: z.string(),
  firstName: z
    .string()
    .min(1, { message: "El campo para los nombres no debe estar vacío." }),
  lastName: z
    .string()
    .min(1, { message: "El campo para los apellidos no debe estar vacío." }),
  dni: z
    .string()
    .regex(/^\d{8}$/, { message: "El DNI debe tener 8 dígitos números." }),
  address: z
    .string()
    .min(1, { message: "El campo para la dirección no debe estar vacío." }),
  department: z.string(),
  province: z.string(),
  district: z.string(),
  cellPhone: z.string().regex(/^\d{9}$/, {
    message: "El número de celular debe tener 9 dígitos números.",
  }),
  paymentOption: z.string(),
});

export const validateCheckout = (checkoutData) => {
  return checkoutSchema.safeParse(checkoutData);
};

export const validateInputCheckout = ({ name, value }) => {
  const selectedSchema =
    name === INPUT_NAMES.EMAIL
      ? checkoutSchema.pick({ email: true })
      : name === INPUT_NAMES.DELIVERY_OPTION
      ? checkoutSchema.pick({ deliveryOption: true })
      : name === INPUT_NAMES.COUNTRY
      ? checkoutSchema.pick({ country: true })
      : name === INPUT_NAMES.FIRST_NAME
      ? checkoutSchema.pick({ firstName: true })
      : name === INPUT_NAMES.LAST_NAME
      ? checkoutSchema.pick({ lastName: true })
      : name === INPUT_NAMES.DNI
      ? checkoutSchema.pick({ dni: true })
      : name === INPUT_NAMES.ADDRESS
      ? checkoutSchema.pick({ address: true })
      : name === INPUT_NAMES.DEPARTMENT
      ? checkoutSchema.pick({ department: true })
      : name === INPUT_NAMES.PROVINCE
      ? checkoutSchema.pick({ province: true })
      : name === INPUT_NAMES.DISTRICT
      ? checkoutSchema.pick({ district: true })
      : name === INPUT_NAMES.CELL_PHONE
      ? checkoutSchema.pick({ cellPhone: true })
      : name === INPUT_NAMES.PAYMENT_OPTION
      ? checkoutSchema.pick({ paymentOption: true })
      : null;

  if (selectedSchema) {
    return selectedSchema.safeParse({ [name]: value });
  }
};
