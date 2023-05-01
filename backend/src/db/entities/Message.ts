import {Entity, Property, ManyToOne, PrimaryKey} from "@mikro-orm/core";
import type { Rel } from "@mikro-orm/core";
import { User } from "./User.js";


@Entity()
export class Message{
	@PrimaryKey()
	id!: number;

	@ManyToOne()
	sender_email!: Rel<User>;

	@ManyToOne()
	receiver_email!: Rel<User>;

	@Property()
	message!: string;
}
