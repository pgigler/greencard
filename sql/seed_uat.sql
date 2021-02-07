DELETE FROM uat_appointments;
DELETE FROM uat_days;

INSERT INTO uat_days (`day`, `status`) VALUES ('2021-02-24', 'DISABLED');
INSERT INTO uat_days (`day`, `status`) VALUES ('2021-02-27', 'ENABLED');

