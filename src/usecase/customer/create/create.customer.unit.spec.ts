
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface'
import { InputCreateCustomerDto } from './create.customer.dto'
import CreateCustomerUseCase from './create.customer.usecase'

describe("CreateCustomerUseCase unit tests", () => {
    let MockRepository: () => CustomerRepositoryInterface
    let input: InputCreateCustomerDto 

    beforeEach(() => {
        MockRepository = () => {
            return {
                find: jest.fn(),
                findAll: jest.fn(),
                create: jest.fn(),
                update: jest.fn()
            }
        }

        input =  {
            name: "Matheus",
            address: {
                street: "Street",
                number: 123,
                zip: "Zip",
                city: "City"
            }
        }
    })

    it("Should create a customer", async () => {
        const customerRepository = MockRepository()
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

        const output = await customerCreateUseCase.execute(input)
        
        const expected = {
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }

        }

        expect(output).toEqual(expected)
    })

    it("Should throw an error when name is missing", async () => {
        const customerRepository = MockRepository()
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

        input.name = ""

        expect(async () => await customerCreateUseCase.execute(input))
            .rejects.toThrow("Name is required!")
    })
})