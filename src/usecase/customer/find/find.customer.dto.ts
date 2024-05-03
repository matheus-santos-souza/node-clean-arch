import { UUID } from "crypto"

export interface InputFindCustomerDto {
    id: UUID
}

export interface OutputFindCustomerDto {
    id: UUID
    name: string
    address: {
        street: string
        city: string
        number: number
        zip: string
    }
}