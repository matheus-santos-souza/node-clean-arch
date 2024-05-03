import Customer from "../../../domain/customer/entity/customer"
import { CustomerFactory } from "../../../domain/customer/factory/customer.factory"
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface"
import Address from "../../../domain/customer/value-object/address"
import { InputUpdateCustomerDto } from "./update.customer.dto"
import UpdateCustomerUseCase from "./update.customer.usecase"


describe("UpdateCustomerUseCase unit tests", () => {
    let customer: Customer
    let input: InputUpdateCustomerDto
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

        customer = CustomerFactory.createWithAddress(
            "Matheus",
            new Address({
                city: "City",
                number: 123,
                street: "Street",
                zip: "Zip"
            })
        )

        input = {
            id: customer.id,
            name: "Matheus Updated",
            address: {
                city: "City updated",
                number: 321,
                street: "Street updated",
                zip: "Zip updated"
            }
        }
    })

    it("Should update a Customer", async () => {
        const customerRepository = MockRepository()
        jest.spyOn(customerRepository, "find")
            .mockReturnValue(Promise.resolve(customer))

        const useCase = new UpdateCustomerUseCase(customerRepository)

        const output = await useCase.execute(input)

        expect(output).toEqual(input)
    })

})