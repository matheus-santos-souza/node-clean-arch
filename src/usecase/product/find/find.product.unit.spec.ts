import Product from "../../../domain/product/entity/product"
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface"
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto"
import FindProductUseCase from "./find.product.usecase"

describe("FindProductUseCase unit tests", () => {
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

    it("Should find producut", async () => {
        const productRepository = MockRepository()
        jest.spyOn(productRepository, "find")
            .mockReturnValue(Promise.resolve(product))
        const useCase = new FindProductUseCase(productRepository)
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