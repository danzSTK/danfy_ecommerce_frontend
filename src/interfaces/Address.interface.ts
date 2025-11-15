import { AddressTypes } from "./Constants";

export interface ICepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface IAddress {
  id: number;
  userId: number;
  nomeCompleto: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  referencia?: string;
  ibgeCode?: string;
  isDefault: boolean;
  tipo: AddressTypes;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateAddressRequest {
  cep: string;
  nomeCompleto: string;
  telefone: string;
  numero: string;
  complemento?: string;
  referencia?: string;
  isDefault?: boolean;
  tipo: AddressTypes;
}

export interface IUpdateAddressRequest extends Partial<ICreateAddressRequest> {
  id: number;
}
