import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Books1709015929112 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "books",
               columns: [
                  {
                     name: "id",
                     type: "int",
                     isPrimary: true,
                     isGenerated: true,
                     generationStrategy: "increment",
                  },
                  {
                     name: "title",
                     type: "varchar",
                     length: "255",
                  },
   
                  {
                     name: "genre",
                     type: "varchar",
                     length: "50",
                  },
                  {
                     name: "author_id",
                     type: "int",
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
               foreignKeys: [
                  {
                     columnNames: ["author_id"],
                     referencedTableName: "authors",
                     referencedColumnNames: ["id"],
                  },
               ],
            }),
            true
         );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("books");
    }

}
