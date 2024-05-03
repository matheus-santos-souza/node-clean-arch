import Product from "../../../domain/product/entity/product"
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface"
import { OutputListPorductDto } from "./list.product.dto"
import ListProductUseCase from "./list.product.usecase"

describe("ListProductUseCase unit tests", () => {
    let output: OutputListPorductDto = { products: [] }
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

        const product1 = new Product({ name: "Product1", price: 100 })
        const product2 = new Product({ name: "Product2", price: 200 })

        output.products = [product1, product2]
    })

    it("Should list product", async () => {
        const productRepository = MockRepository()
        jest.spyOn(productRepository, "findAll")
            .mockReturnValue(Promise.resolve(output.products as unknown as Product[]))

        const useCase = new ListProductUseCase(productRepository)

        const result = await useCase.execute({})

        expect(result.products.length).toBe(output.products.length)
        expect(result.products[0].id).toBe(output.products[0].id)
        expect(result.products[0].name).toBe(output.products[0].name)
        expect(result.products[0].price).toBe(output.products[0].price)

        expect(result.products[1].id).toBe(output.products[1].id)
        expect(result.products[1].name).toBe(output.products[1].name)
        expect(result.products[1].price).toBe(output.products[1].price)
    })
})