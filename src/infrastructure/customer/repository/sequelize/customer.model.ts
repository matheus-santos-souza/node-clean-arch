import { UUID } from "crypto";
import { Model, Column, PrimaryKey, Table, DataType } from "sequelize-typescript";

@Table({
    tableName: "customers",
    timestamps: false
})
export default class CustomerModel extends Model {
    @PrimaryKey
    @Column(DataType.STRING)
    declare id: UUID

    @Column(DataType.STRING)
    declare name: string

    @Column(DataType.BOOLEAN)
    declare active: boolean

    @Column(DataType.NUMBER)
    declare rewardPoints: number

    @Column(DataType.STRING)
    declare street: string

    @Column(DataType.NUMBER)
    declare number: number

    @Column(DataType.STRING)
    declare zipcode: string

    @Column(DataType.STRING)
    declare city: string
}