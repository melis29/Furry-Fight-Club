import { Migration } from '@mikro-orm/migrations';

export class Migration20230501214331 extends Migration {

	async up(): Promise<void> {
		this.addSql('alter table "message" drop constraint "message_sender_id_foreign";');
		this.addSql('alter table "message" drop constraint "message_receiver_id_foreign";');

		this.addSql('alter table "message" add column "sender_email_id" int not null, add column "receiver_email_id" int not null;');
		this.addSql('alter table "message" add constraint "message_sender_email_id_foreign" foreign key ("sender_email_id") references "users" ("id") on update cascade;');
		this.addSql('alter table "message" add constraint "message_receiver_email_id_foreign" foreign key ("receiver_email_id") references "users" ("id") on update cascade;');
		this.addSql('alter table "message" drop column "sender_id";');
		this.addSql('alter table "message" drop column "receiver_id";');
	}

	async down(): Promise<void> {
		this.addSql('alter table "message" drop constraint "message_sender_email_id_foreign";');
		this.addSql('alter table "message" drop constraint "message_receiver_email_id_foreign";');

		this.addSql('alter table "message" add column "sender_id" int not null, add column "receiver_id" int not null;');
		this.addSql('alter table "message" add constraint "message_sender_id_foreign" foreign key ("sender_id") references "users" ("id") on update cascade;');
		this.addSql('alter table "message" add constraint "message_receiver_id_foreign" foreign key ("receiver_id") references "users" ("id") on update cascade;');
		this.addSql('alter table "message" drop column "sender_email_id";');
		this.addSql('alter table "message" drop column "receiver_email_id";');
	}

}
