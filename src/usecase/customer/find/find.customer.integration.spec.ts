import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("FindCustomerUseCase integration tests", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {
                force: true
            }
        })

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("Should find a customer", async () => {
        const customerRepository = new CustomerRepository()
        const useCase = new FindCustomerUseCase(customerRepository)

        const customer = new Customer({ name: "Fulano" })
        const address = new Address({
            city: "City", 
            number: 1,
            street: "Street",
            zip: "Zip"
        })
        customer.changeAddress(address)
        
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
})