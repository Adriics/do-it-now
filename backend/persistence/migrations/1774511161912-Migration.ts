import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1774511161912 implements MigrationInterface {
    name = 'Migration1774511161912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "actions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "receptor" text NOT NULL, "phone" character varying, "message" text NOT NULL, "status" character varying NOT NULL, "executeAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7bfb822f56be449c0b8adbf83cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pushSubscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "endpoint" character varying NOT NULL, "auth" character varying NOT NULL, "p256dh" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_978b44f06f58f7981a1b7b506bf" UNIQUE ("endpoint"), CONSTRAINT "PK_2bd6fe3a45ade38e77e1a7db7b5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pushSubscription"`);
        await queryRunner.query(`DROP TABLE "actions"`);
    }

}
