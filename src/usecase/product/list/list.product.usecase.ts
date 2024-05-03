import Product from "../../../domain/product/entity/product"
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface"
import { InputListProductDto, OutputListPorductDto } from "./list.product.dto"

export default class ListProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) {}

    async execute(input: InputListProductDto): Promise<OutputListPorductDto> {
        const products = await this.productRepository.findAll()
        return OutputMapper.toOutput(products)
    }
}

class OutputMapper {
    static toOutput(products: Product[]): OutputListPorductDto {
        return {
            products: products.map((product: Product) => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price
                }
            })
        }
    }
}