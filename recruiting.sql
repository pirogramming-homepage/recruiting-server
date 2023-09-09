CREATE TABLE `Document` (
	`document_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`workshop_ok` BOOLEAN NOT NULL,
	`attend_ok` BOOLEAN NOT NULL,
	`pi_ok` BOOLEAN	NOT NULL,
	`deposit_ok` BOOLEAN NOT NULL,
	`name` VARCHAR(16) NOT NULL,
	`gender` VARCHAR(1) NOT NULL,
	`university` VARCHAR(24) NOT NULL,
	`major` VARCHAR(48) NOT NULL,
	`minor` VARCHAR(48) NULL,
	`minor_course` INT NULL,
	`level` INT NOT NULL,
	`address` VARCHAR(300) NOT NULL,
	`phone` VARCHAR(24) NOT NULL,
	`interview` VARCHAR(24)	NOT NULL,
	`q1_introduce` VARCHAR(700) NOT NULL,
	`q2_experience` VARCHAR(500) NOT NULL,
	`q3_idea` VARCHAR(400) NOT NULL,
	`q4_performance` VARCHAR(500) NOT NULL,
	`q5_patience` VARCHAR(500) NOT NULL,
	`q6_plan` TEXT	NOT NULL,
	`coding_test` VARCHAR(256) NULL,
	`doyouknowpiro` VARCHAR(48) NOT NULL,
	`confirm_ok` BOOLEAN NOT NULL,
	`piro_level` INT NOT NULL
);

CREATE TABLE `Executive` (
	`executive_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`name`	VARCHAR(24) NOT NULL,
	`phone`	VARCHAR(24) NOT NULL,
	`executive_piro_level` INT NOT NULL
);

CREATE TABLE `Code` (
	`code` VARCHAR(24) NOT NULL PRIMARY KEY
);

CREATE TABLE `Evaluation` (
	`evaluation_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`q1` INT NOT NULL,
	`q2` INT NOT NULL,
	`q3` INT NOT NULL,
	`q4` INT NOT NULL,
	`q5` INT NOT NULL,
	`q6` INT NOT NULL,
	`coding_test` INT NOT NULL,
	`executive_fk` INT NOT NULL,
	`document_fk` INT NOT NULL,
	FOREIGN KEY (executive_fk) REFERENCES Executive(executive_id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (document_fk) REFERENCES Document(document_id) ON UPDATE CASCADE ON DELETE CASCADE
);