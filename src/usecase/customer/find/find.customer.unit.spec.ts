import { randomUUID } from "crypto";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";

describe("FindCustomerUseCase unit tests", () => {
    let customer: Customer
    let MockRepository: () => CustomerRepositoryInterface

    beforeEach(() => {
        MockRepository = () => {
            return {
                create: jest.fn(),
                find: jest.fn(),
                findAll: jest.fn(),
                update: jest.fn(),
            }
        }

        customer = new Customer({ name: "Fulano" })
        const address = new Address({
            city: "City", 
            number: 1,
            street: "Street",
            zip: "Zip"
        })
        customer.changeAddress(address)
    })

    it("Should find a customer", async () => {
        const customerRepository = MockRepository()
        jest.spyOn(customerRepository, "find")
            .mockReturnValue(Promise.resolve(customer))
        const useCase = new FindCustomerUseCase(customerRepository)
        await customerRepository.create(customer)

        const input  = {
            id: customer.id
        }

        const output = {
            id: customer.id,
            name: customer.name,
            address: {
                city: customer.address.city, 
                number: customer.address.number,
                street: customer.address.street,
                zip: customer.address.zip
            }
        }

        const result = await useCase.execute(input)
        
        expect(result).toEqual(output)
    })

    it("Should not found a customer", async () => {
        const customerRepository = MockRepository()
        jest.spyOn(customerRepository, "find")
            .mockImplementation(() => { throw new Error("Customer not found!") })
        const useCase = new FindCustomerUseCase(customerRepository)

        const input  = {
            id: randomUUID()
        }
        expect(async () =>  await useCase.execute(input))
            .rejects.toThrow("Customer not found!")
    })
})