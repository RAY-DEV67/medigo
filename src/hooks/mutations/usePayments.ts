import { useMutation } from "@tanstack/react-query";
import {
  AddPaymentPayload,
  PaymentIntentPayload,
} from "../../types/payment.types";
import paymentService from "../../api/services/paymentService";

export const useAddPaymentMutation = () => {
  return useMutation({
    mutationFn: (payload: AddPaymentPayload) =>
      paymentService.addPaymentMethod(payload),
    onSuccess: (data) => {
      console.log("Payment method added:", data.message);
    },
    onError: (error: any) => {
      // Handling the 422 errors specifically
      const validationError = error.response?.data?.detail?.[0]?.msg;
      console.error(
        "Payment Error:",
        validationError || "Failed to add payment method",
      );
    },
  });
};

export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationFn: (payload: PaymentIntentPayload) =>
      paymentService.createPaymentIntent(payload),
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to initialize payment";
    },
  });
};
