import { AxiosResponse } from "axios";
import apiClient from "../client";
import {
  AddPaymentPayload,
  EarningsHistoryResponse,
  EarningsSummaryResponse,
  PaymentMethodResponse,
  PaymentMethodsResponse,
  WalletResponse,
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
  getEarningsBalance: async (): Promise<WalletResponse> => {
    const response = await apiClient.get("/payments/earnings/balance");
    return response.data;
  },

  getEarningsSummary: async (): Promise<EarningsSummaryResponse> => {
    const response = await apiClient.get("/payments/earnings/summary");
    return response.data;
  },

  getEarningsHistory: async (
    days: number = 7,
  ): Promise<EarningsHistoryResponse> => {
    const response = await apiClient.get("/payments/earnings/history", {
      params: { days },
    });
    return response.data;
  },
};

export default paymentService;
