import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../src/user/user.entity';

export class InitialCreate1584776858354 implements MigrationInterface {
  name = 'InitialCreate1584776858354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `name` varchar(100) NOT NULL, UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `price` double NOT NULL, `amount` double NOT NULL, `description` text NULL, `date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `purchase` (`id` int NOT NULL AUTO_INCREMENT, `amount` double NOT NULL, `description` text NOT NULL, `date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `completed` tinyint NOT NULL, `userId` int NULL, `productId` int NULL, `customerId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `customer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `address` varchar(200) NOT NULL, `phone` varchar(50) NOT NULL, `companyName` varchar(100) NULL, `taxId` varchar(20) NOT NULL, `nationalId` varchar(20) NOT NULL, `checkingAccount` varchar(40) NOT NULL, `description` text NOT NULL, `date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `product` ADD CONSTRAINT `FK_329b8ae12068b23da547d3b4798` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `purchase` ADD CONSTRAINT `FK_33520b6c46e1b3971c0a649d38b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `purchase` ADD CONSTRAINT `FK_9af3a556aa0f166dd771a1e6c46` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `purchase` ADD CONSTRAINT `FK_2195a69f2b102198a497036ec9e` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `customer` ADD CONSTRAINT `FK_3f62b42ed23958b120c235f74df` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );

    const user = getRepository(User).create({
      username: 'testuser',
      // 12345678
      password: '$2y$10$3P4wLnGueG0XWNdsL4O.YuAk6sbpO5Bxb0l8N5t2rLO8JUcP11rJy',
    });

    await getRepository(User).save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `customer` DROP FOREIGN KEY `FK_3f62b42ed23958b120c235f74df`', undefined);
    await queryRunner.query('ALTER TABLE `purchase` DROP FOREIGN KEY `FK_2195a69f2b102198a497036ec9e`', undefined);
    await queryRunner.query('ALTER TABLE `purchase` DROP FOREIGN KEY `FK_9af3a556aa0f166dd771a1e6c46`', undefined);
    await queryRunner.query('ALTER TABLE `purchase` DROP FOREIGN KEY `FK_33520b6c46e1b3971c0a649d38b`', undefined);
    await queryRunner.query('ALTER TABLE `product` DROP FOREIGN KEY `FK_329b8ae12068b23da547d3b4798`', undefined);
    await queryRunner.query('DROP TABLE `customer`', undefined);
    await queryRunner.query('DROP TABLE `purchase`', undefined);
    await queryRunner.query('DROP TABLE `product`', undefined);
    await queryRunner.query('DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`', undefined);
    await queryRunner.query('DROP TABLE `user`', undefined);
  }
}
