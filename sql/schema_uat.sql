DROP TABLE IF EXISTS uat_appointments;
DROP TABLE IF EXISTS uat_days;

CREATE TABLE uat_appointments(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `day` DATETIME NOT NULL,
    serviceType VARCHAR(20) NOT NULL, -- MOT_TEST (műszaki vizsga), INFO_CHECK (eredetvizsga)
    timeSlot VARCHAR(10) NOT NULL, -- 8:30, 9:00, ..., 15:30
    email VARCHAR(200) NOT NULL, -- proper email address
	`name` VARCHAR(200) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	regNumber VARCHAR(10) NOT NULL,
	autoType VARCHAR(100) NOT NULL,
	remark VARCHAR(500) NOT NULL,
    createdTs TIMESTAMP NOT NULL,
    creator VARCHAR(100) NOT NULL,
    updatedTs TIMESTAMP,
    updater VARCHAR(100),
    deleted INT NOT NULL DEFAULT 0 -- 0 (false), 1 (true)
);

CREATE TABLE uat_days(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `day` DATETIME,
    `status` VARCHAR(20)  -- ENABLED, DISABLED (beyond normal opening hours)
);
