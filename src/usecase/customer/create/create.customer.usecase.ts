import Customer from "../../../domain/customer/entity/customer";
import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";

export default class CreateCustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface
    ) {}

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const address = new Address({
            city: input.address.city,
            number: input.address.number,
            street: input.address.street,
            zip: input.address.zip
        })
        const customer = CustomerFactory.createWithAddress(input.name, address)
        await this.customerRepository.create(customer)
        return {
            id: customer.id,
            name: customer.name,
            address: {
                city: customer.address.city,
                number: customer.address.number,
                street: customer.address.street,
                zip: customer.address.zip
            }

        }
    }
}