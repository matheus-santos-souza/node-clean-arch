import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
    static listXML(data: OutputListCustomerDto): string {
        const xmlOptions = {
            header: true,
            indent: " ",
            newLine: "\n",
            allowEmpty: true
        }

        return toXML(
            {
                customers: {
                    customer: data.customers.map(customer => {
                        return {
                            id: customer.id,
                            name: customer.name,
                            address: {
                                street: customer.address.street,
                                city: customer.address.city,
                                zip: customer.address.zip,
                                number: customer.address.number
                            }
                        }
                    })
                }
            }, 
            xmlOptions
        )
    }
}