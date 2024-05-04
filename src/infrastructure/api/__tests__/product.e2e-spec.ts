import { app, sequelize } from '../express'
import request from 'supertest'

describe("E2E test for Customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("Should create product", async () => {
        const response = await request(app)
            .post('/product')
            .send({
                name: "Product1",
                price: 100
            })
        
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Product1")
        expect(response.body.price).toBe(100)
    })

    it("Should not create product", async () => {
        const response = await request(app)
            .post('/product')
            .send({
                name: "",
                price: 100
            })
        
        expect(response.status).toBe(500)
    })

    it("Should list all products", async () => {
        const response1 = await request(app)
            .post('/product')
            .send({
                name: "Product1",
                price: 100
            })
        expect(response1.status).toBe(200)

        const response2  = await request(app)
            .post('/product')
            .send({
                name: "Product2",
                price: 200
            })
        expect(response2.status).toBe(200)

        const responseList = await request(app)
            .get('/product')
            .send({})
        
        expect(responseList.status).toBe(200)
        expect(responseList.body.products.length).toBe(2)
        expect(responseList.body.products[0].name).toBe("Product1")
        expect(responseList.body.products[0].price).toBe(100)

        expect(responseList.body.products[1].name).toBe("Product2")
        expect(responseList.body.products[1].price).toBe(200)
    })
})