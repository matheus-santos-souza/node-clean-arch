import { UUID } from "node:crypto";
import Notification from "../notification/notification";

export default abstract class Entity {
    protected _id: UUID
    public notification: Notification

    constructor() {
        this. notification = new Notification()
    }

    get id(): UUID {
        return this._id
    }
}