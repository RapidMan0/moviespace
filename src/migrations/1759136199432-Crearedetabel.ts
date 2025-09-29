import { MigrationInterface, QueryRunner } from "typeorm";

export class Crearedetabel1759136199432 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "email" VARCHAR NOT NULL UNIQUE,
                "password" VARCHAR NOT NULL,
                "name" VARCHAR,
                "role" VARCHAR NOT NULL DEFAULT 'user',
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE "title" (
                "id" SERIAL PRIMARY KEY,
                "type" VARCHAR NOT NULL,
                "name" VARCHAR NOT NULL,
                "original_name" VARCHAR,
                "year" INT,
                "description" TEXT,
                "poster_url" VARCHAR,
                "genres" VARCHAR,
                "popularity" FLOAT,
                "runtime_minutes" INT,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE "episode" (
                "id" SERIAL PRIMARY KEY,
                "title_id" INT NOT NULL REFERENCES "title"("id") ON DELETE CASCADE,
                "season_number" INT NOT NULL,
                "episode_number" INT NOT NULL,
                "name" VARCHAR,
                "description" TEXT,
                "runtime_minutes" INT
            );

            CREATE TABLE "rating" (
                "id" SERIAL PRIMARY KEY,
                "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
                "title_id" INT NOT NULL REFERENCES "title"("id") ON DELETE CASCADE,
                "score" INT NOT NULL,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT rating_unique UNIQUE ("user_id", "title_id")
            );

            CREATE TABLE "watchlist" (
                "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
                "title_id" INT NOT NULL REFERENCES "title"("id") ON DELETE CASCADE,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY ("user_id", "title_id")
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "watchlist";
            DROP TABLE IF EXISTS "rating";
            DROP TABLE IF EXISTS "episode";
            DROP TABLE IF EXISTS "title";
            DROP TABLE IF EXISTS "user";
        `);
    }
}
