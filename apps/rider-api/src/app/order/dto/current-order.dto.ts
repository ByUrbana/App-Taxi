import { ObjectType } from "@nestjs/graphql";
import { Point } from "@urbana/database";
import { OrderDTO } from "./order.dto";

@ObjectType()
export class CurrentOrder {
    order: OrderDTO;
    driverLocation?: Point;
}