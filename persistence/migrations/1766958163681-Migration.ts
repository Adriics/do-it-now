import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1766958163681 implements MigrationInterface {
    name = 'Migration1766958163681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actions" ADD "message" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actions" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actions" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "actions" DROP COLUMN "message"`);
    }

}
