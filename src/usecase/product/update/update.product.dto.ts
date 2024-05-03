import { UUID } from "node:crypto";

export interface InputUpdateProductDto {
    id: UUID,
    name: string,
    price: number
}

export interface OutputUpdateProductDto {
    id: UUID,
    name: string,
    price: number
}