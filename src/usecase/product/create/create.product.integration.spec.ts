import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import { InputCreateProductDto } from "./create.product.dto";

describe("CreateProductUseCase integration tests", () => {
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

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("Should create a product", async () => {
        const productRepository = new ProductRepository()
        const useCase = new CreateProductUseCase(productRepository)
        const input: InputCreateProductDto = {
            name: "Product 1",
            price: 100
        }

        const output = await useCase.execute(input)
        const find = await productRepository.find(output.id)

        expect(output.id).toBe(find.id)
        expect(output.name).toBe(find.name)
        expect(output.price).toBe(find.price)
    })
})