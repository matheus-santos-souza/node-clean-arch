import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import * as yup from 'yup'
import Product from "../entity/product";

export default class ProductYupValidator implements ValidatorInterface<Product> {
    validate(entity: Product): void {
        try {
            yup
                .object()
                .shape({
                    id: yup.string(),
                    name: yup.string().required("Name is required!"),
                    price: yup.number().min(0, "price cannot be less than 0!")
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
                    context: "product",
                    message: error
                })
            })
        }
    }

}