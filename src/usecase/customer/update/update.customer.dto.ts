import { UUID } from "crypto";

export interface InputUpdateCustomerDto {
    id: UUID,
    name: string,
    address: {
        street: string,
        number: number,
        city: string,
        zip: string
    }
}

export interface OutputUpdateCustomerDto {
    id: UUID,
    name: string,
    address: {
        street: string,
        number: number,
        city: string,
        zip: string
    }
}