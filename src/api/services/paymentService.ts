import { AxiosResponse } from "axios";
import apiClient from "../client";
import {
  AddPaymentPayload,
  PaymentMethodResponse,
  PaymentMethodsResponse,
} from "../../types/payment.types";

const paymentService = {
  addPaymentMethod: async (
    payload: AddPaymentPayload,
  ): Promise<PaymentMethodResponse> => {
    const response: AxiosResponse<PaymentMethodResponse> = await apiClient.post(
      "/payments/payment-methods/",
      payload,
    );
    return response.data;
  },

  getPaymentMethods: async (): Promise<PaymentMethodsResponse> => {
    const response: AxiosResponse<PaymentMethodsResponse> = await apiClient.get(
      "/payments/payment-methods/",
    );
    return response.data;
  },
};

export default paymentService;
