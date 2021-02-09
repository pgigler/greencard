DELETE FROM uat_appointments;
DELETE FROM uat_days;

SET @yesterday = '2021-02-10';
SET @today = '2021-02-11';
SET @threemonthslater = '2021-05-11';
SET @threemonthslaterplusoneday = '2021-05-12';

INSERT INTO uat_appointments (`day`, serviceType, timeSlot, email, `name`, phone, regNumber, autoType, remark, createdTs, creator) VALUES
    (@yesterday, 'MotTest', '9:30', 'geza@hopp.com', 'Kiss Géza', '06302221111', 'ABC-123', 'Ford Fiesta', 'Árvíztűrő tükörfúrógép', now(), 'anonymous'),
    (@today, 'MotTest', '10:00', 'geza@hopp.com', 'Kiss Géza', '06302221111', 'ABC-123', 'Ford Fiesta', 'Árvíztűrő tükörfúrógép', now(), 'anonymous'),
    (@today, 'InfoCheck', '10:30', 'geza@hopp.com', 'Kiss Géza', '06302221111', 'ABC-123', 'Ford Fiesta', 'Árvíztűrő tükörfúrógép', now(), 'anonymous'),
    (@threemonthslater, 'InfoCheck', '10:30', 'geza2@hopp.com', 'Kiss Géza', '06302221111', 'ABC-123', 'Ford Fiesta', 'Árvíztűrő tükörfúrógép', now(), 'anonymous'),
    (@threemonthslaterplusoneday, 'InfoCheck', '10:30', 'geza2@hopp.com', 'Kiss Géza', '06302221111', 'ABC-123', 'Ford Fiesta', 'Árvíztűrő tükörfúrógép', now(), 'anonymous');

INSERT INTO uat_days (`day`, `status`) VALUES ('2021-02-24', 'DISABLED');
INSERT INTO uat_days (`day`, `status`) VALUES ('2021-02-27', 'ENABLED');

