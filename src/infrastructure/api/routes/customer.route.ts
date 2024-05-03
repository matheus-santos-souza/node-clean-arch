import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import { InputCreateCustomerDto } from "../../../usecase/customer/create/create.customer.dto";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";

export const customerRoute = express.Router();

customerRoute.post('/customer', async (req: Request, res: Response) => {
    const useCase = new CreateCustomerUseCase(new CustomerRepository())
    try {
        const inputCustomerDto: InputCreateCustomerDto = {
            name: req.body.name,
            address: {
                city: req.body.address.city,
                number: req.body.address.number,
                street: req.body.address.street,
                zip: req.body.address.zip
            }
        }
        const output = await useCase.execute(inputCustomerDto)
        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})

customerRoute.get('/customer', async (req: Request, res: Response) => {
    const useCase = new ListCustomerUseCase(new CustomerRepository())
    try {
        const output = await useCase.execute({})
        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})