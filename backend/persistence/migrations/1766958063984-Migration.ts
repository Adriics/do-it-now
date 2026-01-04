import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1766958063984 implements MigrationInterface {
    name = 'Migration1766958063984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "actions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "receptor" text NOT NULL, "executeAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7bfb822f56be449c0b8adbf83cf" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "actions"`);
    }

}
