import { UUID } from "node:crypto";

export interface InputFindProductDto {
    id: UUID
}

export interface OutputFindProductDto {
    id: UUID,
    name: string,
    price: number
}