import { Migration } from '@mikro-orm/migrations';

export class Migration20230501184914 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "message" drop constraint "message_sender_id_foreign";');

    this.addSql('alter table "message" add column "id" serial;');
    this.addSql('alter table "message" drop constraint "message_pkey";');
    this.addSql('alter table "message" add constraint "message_sender_id_foreign" foreign key ("sender_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "message" add constraint "message_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "message" drop constraint "message_sender_id_foreign";');

    this.addSql('alter table "message" drop constraint "message_pkey";');
    this.addSql('alter table "message" drop column "id";');
    this.addSql('alter table "message" add constraint "message_sender_id_foreign" foreign key ("sender_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "message" add constraint "message_pkey" primary key ("sender_id");');
  }

}
