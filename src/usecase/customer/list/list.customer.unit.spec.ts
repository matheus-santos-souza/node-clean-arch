import Customer from "../../../domain/customer/entity/customer"
import { CustomerFactory } from "../../../domain/customer/factory/customer.factory"
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface"
import Address from "../../../domain/customer/value-object/address"
import { OutputListCustomerDto } from "./list.customer.dto"
import ListCustomerUseCase from "./list.customer.usecase"

describe("ListCustomerUseCase unit tests", () => {
    let customers: OutputListCustomerDto = { customers: [] }
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

        const customer1 = CustomerFactory.createWithAddress(
            "Matheus",
            new Address({
                city: "City1",
                number: 1,
                street: "Street1",
                zip: "Zip1"
            })
        )

        const customer2 = CustomerFactory.createWithAddress(
            "Fulano2",
            new Address({
                city: "City2",
                number: 2,
                street: "Street2",
                zip: "Zip2"
            })
        )

        customers.customers = [customer1, customer2]
    })

    it("Should list a customers", async () => {
        const customerRepository = MockRepository()
        jest.spyOn(customerRepository, "findAll")
            .mockReturnValue(Promise.resolve(customers.customers as Customer[]))
        
        const useCase = new ListCustomerUseCase(customerRepository)
        const output = await useCase.execute({})

        expect(output.customers.length).toBe(2)
        expect(output.customers[0].id).toBe(customers.customers[0].id)
        expect(output.customers[0].name).toBe(customers.customers[0].name)
        expect(output.customers[0].address.street).toBe(customers.customers[0].address.street)

        expect(output.customers.length).toBe(2)
        expect(output.customers[1].id).toBe(customers.customers[1].id)
        expect(output.customers[1].name).toBe(customers.customers[1].name)
        expect(output.customers[1].address.street).toBe(customers.customers[1].address.street)
    })
})