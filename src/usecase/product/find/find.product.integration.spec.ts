import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

describe("FindProductUseCase integration tests", () => {
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

    it("Should find product", async () => {
        const productRepository = new ProductRepository()
        const useCase = new FindProductUseCase(productRepository)

        const product = new Product({ name: "Product 1", price: 100 })
        await productRepository.create(product)

        const input: InputFindProductDto = {
            id: product.id
        }

        const output = await useCase.execute(input)

        const expected: OutputFindProductDto = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        expect(output).toEqual(expected)
    })
})