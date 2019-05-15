-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`student` ;

CREATE TABLE IF NOT EXISTS `mydb`.`student` (
  `studentName` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `studentId` VARCHAR(45) NOT NULL,
  `stream` VARCHAR(45) NOT NULL,
  `year` VARCHAR(45) NULL,
  `type` VARCHAR(45) NOT NULL,
  `workingIn` VARCHAR(45) NULL,
  PRIMARY KEY (`studentId`));


-- -----------------------------------------------------
-- Table `mydb`.`questions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`questions` ;

CREATE TABLE IF NOT EXISTS `mydb`.`questions` (
  `questionId` INT NOT NULL AUTO_INCREMENT,
  `question` TEXT NOT NULL,
  `student_studentId` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`questionId`, `student_studentId`),
  INDEX `fk_questions_student_idx` (`student_studentId` ASC) VISIBLE,
  CONSTRAINT `fk_questions_student`
    FOREIGN KEY (`student_studentId`)
    REFERENCES `mydb`.`student` (`studentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`answers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`answers` ;

CREATE TABLE IF NOT EXISTS `mydb`.`answers` (
  `answerId` INT NOT NULL AUTO_INCREMENT,
  `answer` TEXT NOT NULL,
  `vote` INT NULL,
  `questions_questionId` INT NOT NULL,
  `questions_student_studentId` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`answerId`, `questions_questionId`, `questions_student_studentId`),
  INDEX `fk_answers_questions1_idx` (`questions_questionId` ASC, `questions_student_studentId` ASC) VISIBLE,
  CONSTRAINT `fk_answers_questions1`
    FOREIGN KEY (`questions_questionId` , `questions_student_studentId`)
    REFERENCES `mydb`.`questions` (`questionId` , `student_studentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Jobs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Jobs` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Jobs` (
  `jobId` INT NOT NULL,
  `jobDesignation` VARCHAR(45) NOT NULL,
  `jobPlace` VARCHAR(45) GENERATED ALWAYS AS () VIRTUAL,
  `jobType` VARCHAR(45) NULL,
  `student_studentId` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`jobId`, `student_studentId`),
  INDEX `fk_Jobs_student1_idx` (`student_studentId` ASC) VISIBLE,
  CONSTRAINT `fk_Jobs_student1`
    FOREIGN KEY (`student_studentId`)
    REFERENCES `mydb`.`student` (`studentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`student_has_Jobs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`student_has_Jobs` ;

CREATE TABLE IF NOT EXISTS `mydb`.`student_has_Jobs` (
  `student_studentId` VARCHAR(45) NOT NULL,
  `Jobs_jobId` INT NOT NULL,
  PRIMARY KEY (`student_studentId`, `Jobs_jobId`),
  INDEX `fk_student_has_Jobs_Jobs1_idx` (`Jobs_jobId` ASC) VISIBLE,
  INDEX `fk_student_has_Jobs_student1_idx` (`student_studentId` ASC) VISIBLE,
  CONSTRAINT `fk_student_has_Jobs_student1`
    FOREIGN KEY (`student_studentId`)
    REFERENCES `mydb`.`student` (`studentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_has_Jobs_Jobs1`
    FOREIGN KEY (`Jobs_jobId`)
    REFERENCES `mydb`.`Jobs` (`jobId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
