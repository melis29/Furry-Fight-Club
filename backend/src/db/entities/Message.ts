import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import type { Rel } from "@mikro-orm/core";
import { User } from "./User.js";


@Entity()
export class Message{
	@ManyToOne({primary: true})
	sender!: Rel<User>;

	@ManyToOne({nullable: false})
	receiver!: Rel<User>;

	@Property()
	message!: string;
}
