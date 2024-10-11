import { z } from "zod";

const checkoutSchema = z.object({
  email: z.string().email(),
  deliveryOptions: z.string(),
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
  departments: z.string(),
  provinces: z.string(),
  districts: z.string(),
  cellPhone: z.string().regex(/^\d{9}$/, {
    message: "El número de celular debe tener 9 dígitos números.",
  }),
  paymentOptions: z.string(),
});

export const validateCheckout = (checkoutData) => {
  return checkoutSchema.safeParse(checkoutData);
};
