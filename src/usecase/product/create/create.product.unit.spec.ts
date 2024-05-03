import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface"
import { InputCreateProductDto } from "./create.product.dto"
import CreateProductUseCase from "./create.product.usecase"

describe("CreateProductUseCase unit tests", () => {
    let input: InputCreateProductDto
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

        input = {
            name: "Product 1",
            price: 100
        }
    })

    it("Should create a product", async () => {
        const productRepository = MockRepository()
        jest.spyOn(productRepository, "create")
            .mockReturnValue(Promise.resolve(undefined))
        
        const useCase = new CreateProductUseCase(productRepository)

        const output = await useCase.execute(input)

        const expected = {
            id: expect.any(String),
            name: "Product 1",
            price: 100
        }

        expect(output).toEqual(expected)
    })
})