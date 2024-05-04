import { UUID } from "crypto";
import { Model, Column, PrimaryKey, Table, DataType } from "sequelize-typescript";

@Table({
    tableName: "products",
    timestamps: false
})
export default class ProductModel extends Model {
    @PrimaryKey
    @Column(DataType.STRING)
    declare id: UUID

    @Column(DataType.STRING)
    declare name: string
    
    @Column(DataType.NUMBER)
    declare price: number
}