import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post('/product', async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository())
    try {
        const input: InputCreateProductDto = {
            name: req.body.name,
            price: req.body.price
        }
        const output = await useCase.execute(input)
        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})

productRoute.get('/product', async (req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository())
    try {
        const output = await useCase.execute({})
        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})