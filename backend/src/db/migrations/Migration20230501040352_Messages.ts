import { Migration } from '@mikro-orm/migrations';

export class Migration20230501040352 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "message" ("sender_id" int not null, "receiver_id" int not null, "message" varchar(255) not null, constraint "message_pkey" primary key ("sender_id"));');

    this.addSql('alter table "message" add constraint "message_sender_id_foreign" foreign key ("sender_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "message" add constraint "message_receiver_id_foreign" foreign key ("receiver_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "message" cascade;');
  }

}
