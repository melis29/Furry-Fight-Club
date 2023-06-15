import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../entities/User.js";
import bcrypt from "bcrypt";


export class UserSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {

		const hashedPw = await bcrypt.hash("password", 10);

		// https://mikro-orm.io/docs/seeding#shared-context
		context.user1 = em.create(User, {
			name: "Kitty",
			email: "test@gmail.com",
			password: hashedPw,
			petType: "Cat",
			imgUri: "dog.jpg",
			role: UserRole.ADMIN,
			firebase_uid:"mIAX7oHCPXbhQuB6tdV3m6lh3iw1",
		});

		context.user2 = em.create(User, {
			name: "Dogbert",
			email: "test2@gmail.com",
			password: hashedPw,
			petType: "Cat",
			imgUri: "dog.jpg",
			role: UserRole.USER,
			firebase_uid: "1fRyxL5QN6QHvJKktF2fsuZ8RhL2 ",
		});

		context.user3 = em.create(User, {
			name: "Doglord",
			email: "test3@gmail.com",
			password: hashedPw,
			petType: "Cat",
			imgUri: "dog.jpg",
			role: UserRole.USER,
			firebase_uid: "45FGIqgIkSgpK0em2UdXDj38dIi1",
		});

		context.user4 = em.create(User, {
			name: "NotaDog",
			email: "test4@gmail.com",
			password: hashedPw,
			petType: "Cat",
			imgUri: "dog.jpg",
			role: UserRole.USER,
			firebase_uid: "Ibk1YwXBSrRiiHEvbD9JXJTT7wD3",
		});
	}
}
