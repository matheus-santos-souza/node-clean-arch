import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface"
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto"

export default class UpdateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) {}

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const product = await this.productRepository.find(input.id)
        product.name = input.name,
        product.price = input.price
        await this.productRepository.update(product)
        return {
            id: product.id,
            name: input.name,
            price: input.price
        }
    }
}