import { UUID } from "crypto"

export interface InputListCustomerDto {}

type Customer = {
    id: UUID,
    name: string,
    address: {
        city: string,
        number: number,
        street: string,
        zip: string
    }
}

export interface OutputListCustomerDto {
    customers: Customer[]
}