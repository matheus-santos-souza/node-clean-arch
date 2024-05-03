import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

describe("UpdateProdcutUseCase integration test", () => {
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
        const useCase = new UpdateProductUseCase(productRepository)
        const product = new Product({ name: "Product1", price: 100 })
        await productRepository.create(product)

        const input: InputUpdateProductDto = {
            id: product.id,
            name: "Product2",
            price: 200
        }
        const output = await useCase.execute(input)

        expect(output).toEqual(input)
    })
})