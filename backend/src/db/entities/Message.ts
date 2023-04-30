import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { User } from "./User.js";


@Entity()
export class Message{
	@ManyToOne({primary: true})
	sender!: User;

	@ManyToOne({nullable: false})
	receiver!: User;

	@Property()
	message!: string;
}
