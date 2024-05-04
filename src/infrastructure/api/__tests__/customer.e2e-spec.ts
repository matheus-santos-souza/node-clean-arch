import { app, sequelize } from '../express'
import request from 'supertest'

describe("E2E test for Customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("Should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Matheus",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "12345"
                }
            })
        
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Matheus")
        expect(response.body.address.street).toBe("Street")
        expect(response.body.address.city).toBe("City")
        expect(response.body.address.number).toBe(123)
        expect(response.body.address.zip).toBe("12345")
    })

    it("Should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Matheus"
            })
        
        expect(response.status).toBe(500)
    })

    it("Should list all customers", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Matheus",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "12345"
                }
            })

        expect(response.status).toBe(200)

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Matheus2",
                address: {
                    street: "Street2",
                    city: "City2",
                    number: 321,
                    zip: "54321"
                }
            })
        
        expect(response2.status).toBe(200)

        const responseList = await request(app)
            .get("/customer")
            .send()
        
        expect(responseList.status).toBe(200)
        expect(responseList.body.customers.length).toBe(2)

        const customer1 = responseList.body.customers[0]
        const customer2 = responseList.body.customers[1]

        expect(customer1.name).toBe("Matheus")
        expect(customer1.address.street).toBe("Street")

        expect(customer2.name).toBe("Matheus2")
        expect(customer2.address.street).toBe("Street2")

        const responseListXML = await request(app)
            .get("/customer")
            .set("Accept", "application/xml")
            .send()

        expect(responseListXML.status).toBe(200)
        expect(responseListXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
    })
})