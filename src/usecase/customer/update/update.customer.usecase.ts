import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface
    ) {}

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = await this.customerRepository.find(input.id)
        customer.changeName(input.name)
        const address = new Address({ 
            city: input.address.city,
            number: input.address.number,
            street: input.address.street,
            zip: input.address.zip
        })
        customer.changeAddress(address)
        
        await this.customerRepository.update(customer)

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