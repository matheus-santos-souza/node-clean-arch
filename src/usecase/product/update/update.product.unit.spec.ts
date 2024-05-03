import Product from "../../../domain/product/entity/product"
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface"
import { InputUpdateProductDto } from "./update.product.dto"
import UpdateProductUseCase from "./update.product.usecase"

describe("UpdateProductUseCase unit tests", () => {
    let product: Product
    let MockRepository: () => ProductRepositoryInterface

    beforeEach(() => {
        MockRepository = () => {
            return {
                find: jest.fn(),
                findAll: jest.fn(),
                create: jest.fn(),
                update: jest.fn()
            }
        }

        product = new Product({ name: "Product1", price: 100 })
    })

    it("Should update product", async () => {
        const productRepository = MockRepository()
        jest.spyOn(productRepository, "update")
            .mockReturnValue(Promise.resolve(undefined))
        jest.spyOn(productRepository, "find")
            .mockReturnValue(Promise.resolve(product))

        const useCase = new UpdateProductUseCase(productRepository)
        const input: InputUpdateProductDto = {
            id: product.id,
            name: "Product 2",
            price: 200
        }
        const output = await useCase.execute(input)

        expect(output).toEqual(input)
    })
})