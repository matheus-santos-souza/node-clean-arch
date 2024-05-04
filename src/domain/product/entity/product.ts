import { UUID, randomUUID } from "node:crypto";
import { ProductInterface } from "./product.interface";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";

export default class Product extends Entity implements ProductInterface {
    private _name: string;
    private _price: number;

    constructor(props: Omit<ProductInterface, 'id'>, id?: UUID) {
        super()
        this._name = props.name
        this._price = props.price

        if (!id) {
            this._id = randomUUID()
        } else {
            this._id = id
        }

        this.validate()
    }

    public validate(): void {
        ProductValidatorFactory.create().validate(this)
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    get id(): UUID {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }

    set name(newName: string) {
        this._name = newName
        this.validate()
    }

    set price(newPrice: number) {
        this._price = newPrice
        this.validate()
    }
}