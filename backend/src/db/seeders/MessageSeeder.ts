import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Message } from "../entities/Message.js";

export class MessageSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		em.create(Message, {
			sender_email: 1,
			receiver_email: 2,
			message: "Ruff ruff"
		});

		em.create(Message, {
			sender_email: 2,
			receiver_email: 1,
			message: "Ruff ruff for sure"
		});

		em.create(Message, {
			sender_email: 3,
			receiver_email: 2,
			message: "How dare you"
		});

		em.create(Message, {
			sender_email: 1,
			receiver_email: 3,
			message: "Ruff"
		});
		em.create(Message, {
			sender_email: 1,
			receiver_email: 3,
			message: "Ruff Meow"
		});
	}
}
