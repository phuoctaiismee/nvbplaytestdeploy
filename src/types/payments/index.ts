export interface IPaymentsMethod {
  data: PaymentMethodData;
  status: number;
  headers: Headers;
}

export interface PaymentMethodData {
  result: string;
  message: string;
  data: PaymentMethod[];
}

export interface PaymentMethod {
  id: string;
  label: string;
  icon: null | string;
  enable: boolean;
  providers: string[];
  description: string;
  default_provider: DefaultProvider;
}

export interface DefaultProvider {
  name: string;
  id: string;
}
