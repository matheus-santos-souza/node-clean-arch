import { UUID, randomUUID } from "node:crypto";
import Address from '../value-object/address';
import { CustomerInterface } from "./customer.interface";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";

export default class Customer extends Entity implements CustomerInterface {
    private _name: string;
    private _address?: Address;
    private _active?: boolean = false;
    private _rewardPoints?: number = 0;

    constructor(props: Omit<CustomerInterface, 'id'>, id?: UUID) {
        super();
        this._name = props.name
        this._address = props.address
        this._active = props.active || false
        this._rewardPoints = props.rewardPoints || 0

        if (!id) {
            this._id = randomUUID()
        } else {
            this._id = id
        }

        this.validate()
    }

    public validate() {
        CustomerValidatorFactory.create().validate(this)
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

    get address(): Address {
        return this._address
    }

    get active(): boolean {
        return this._active
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    public changeName(name: string): void {
        this._name = name
        this.validate()
    }

    public activate(): void {
        this._active = true
        this.validate()
    }

    public deactivate(): void {
        this._active = false
    }

    public changeAddress(address: Address) {
        this._address = address
    }

    public addRewardPoints(points: number): void {
        this._rewardPoints += points
    }
}