import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from 'yup'
import Address from "../value-object/address";

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {
            yup
                .object()
                .shape({
                    id: yup.string(),
                    name: yup.string().required("Name is required!"),
                    address: new yup.ObjectSchema<Address>(),
                    active: yup.boolean().test(
                        "mandatoryAddress",
                        "Address is mandatory to activate a customer!", 
                        function(value) {
                            if (this.parent.active && !this.parent.address) {
                                return false
                            }
                            return true;
                        }
                    )
                })
                .validateSync(
                    entity,
                    {
                        abortEarly: false
                    }
                )
        } catch (errors) {
            const e = errors as yup.ValidationError
            e.errors.forEach(error => {
                entity.notification.addError({
                    context: "customer",
                    message: error
                })
            })
        }
    }

}