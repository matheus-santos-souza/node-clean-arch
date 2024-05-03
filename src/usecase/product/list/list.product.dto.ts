import { UUID } from "node:crypto"

export interface InputListProductDto {}

type Product = {
    id: UUID,
    name: string,
    price: number
}

export interface OutputListPorductDto {
    products: Product[]
}