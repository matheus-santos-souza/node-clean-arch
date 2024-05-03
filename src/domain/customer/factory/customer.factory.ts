import Customer from "../entity/customer";
import { CustomerInterface } from "../entity/customer.interface";
import Address from "../value-object/address";

export class CustomerFactory {
    public static create(name: string): Customer {
        return new Customer({ name })
    }

    public static createWithAddress(name: string, address: Address): Customer {
        return new Customer({ name, address })
    }
}