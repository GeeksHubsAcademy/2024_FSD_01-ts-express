import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Authors1709015800741 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "authors",
               columns: [
                  {
                     name: "id",
                     type: "int",
                     isPrimary: true,
                     isGenerated: true,
                     generationStrategy: "increment",
                  },
                  {
                     name: "name",
                     type: "varchar",
                     length: "100",
                  },
                  {
                     name: "nationality",
                     type: "varchar",
                     length: "100",
                  },
                  {
                      name: "created_at",
                      type: "timestamp",
                      default: "now()",
                  },
                  {
                      name: "updated_at",
                      type: "timestamp",
                      default: "now()",
                      onUpdate: "now()"
                  }
               ],
            }),
            true
         );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("authors");
    }
}
