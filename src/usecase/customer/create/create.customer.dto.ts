import { UUID } from "crypto"

export interface InputCreateCustomerDto {
    name: string,
    address: {
        street: string
        number: number
        zip: string
        city: string
    }
}

export interface OutputCreateCustomerDto {
    id: UUID,
    name: string,
    address: {
        street: string
        number: number
        zip: string
        city: string
    }
} 