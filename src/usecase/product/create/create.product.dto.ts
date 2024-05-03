import { UUID } from "node:crypto";

export interface InputCreateProductDto {
    name: string;
    price: number;
}

export interface OutputCreateProductDto {
    readonly id: UUID;
    name: string;
    price: number;
}