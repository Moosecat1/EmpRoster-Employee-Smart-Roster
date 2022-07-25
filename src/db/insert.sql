USE SMARTROSTER;

INSERT INTO Company
VALUES ('1', 'Joes MegaCorp');

INSERT INTO OperatingTime
VALUES ('Monday', '9:00', '17:00', '1');
INSERT INTO OperatingTime
VALUES ('Tuesday', '9:00', '17:00', '1');
INSERT INTO OperatingTime
VALUES ('Wednesday', '9:00', '17:00', '1');
INSERT INTO OperatingTime
VALUES ('Thursday', '9:00', '17:00', '1');
INSERT INTO OperatingTime
VALUES ('Friday', '9:00', '17:00', '1');
INSERT INTO OperatingTime
VALUES ('Saturday', '9:00', '17:00', '1');
INSERT INTO OperatingTime
VALUES ('Sunday', '9:00', '17:00', '1');

INSERT INTO Employee
VALUES ('1', 'Password1', 'Jack', 'Neilson', 'neilsonj@joesMC.com', '+61 XXX XXX XXX', 'Full-time', 'Admin', '1');
INSERT INTO Employee
VALUES ('2', 'Password2', 'Alex', 'DeLucia', 'deluciaa@joesMC.com', '+61 XXX XXX XXX', 'Full-time', 'Manager', '1');
INSERT INTO Employee
VALUES ('3', 'Password3', 'Adam', 'Muscat', 'muscata@joesMC.com', '+61 XXX XXX XXX', 'Part-time', 'Employee', '1');
INSERT INTO Employee
VALUES ('4', 'Password4', 'Jaco', 'Swaneopoel', 'swaneopoelj@joesMC.com', '+61 XXX XXX XXX', 'Casual', 'Employee', '1');
INSERT INTO Employee
VALUES ('5', 'Password5', 'Redim', 'Poster', 'posterr@joesMC.com', '+61 XXX XXX XXX', 'Casual', 'Employee', '1');

INSERT INTO Availability
VALUES (DATE '2022/07/04', '9:00', '17:00', '1');
INSERT INTO Availability
VALUES (DATE '2022/07/05', '9:00', '17:00', '1');
INSERT INTO Availability
VALUES (DATE '2022/07/06', '9:00', '17:00', '1');
INSERT INTO Availability
VALUES (DATE '2022/07/07', '9:00', '17:00', '1');
INSERT INTO Availability
VALUES (DATE '2022/07/08', '9:00', '17:00', '1');
INSERT INTO Availability
VALUES (DATE '2022/07/09', '0:00', '0:00', '1');
INSERT INTO Availability
VALUES (DATE '2022/07/10', '0:00', '0:00', '1');
INSERT INTO Availability
VALUES (DATE '2022/07/04', '9:00', '17:00', '2');
INSERT INTO Availability
VALUES (DATE '2022/07/05', '9:00', '17:00', '2');
INSERT INTO Availability
VALUES (DATE '2022/07/06', '9:00', '17:00', '2');
INSERT INTO Availability
VALUES (DATE '2022/07/07', '9:00', '17:00', '2');
INSERT INTO Availability
VALUES (DATE '2022/07/08', '9:00', '17:00', '2');
INSERT INTO Availability
VALUES (DATE '2022/07/09', '0:00', '0:00', '2');
INSERT INTO Availability
VALUES (DATE '2022/07/10', '0:00', '0:00', '2');
INSERT INTO Availability
VALUES (DATE '2022/07/04', '0:00', '0:00', '3');
INSERT INTO Availability
VALUES (DATE '2022/07/05', '0:00', '0:00', '3');
INSERT INTO Availability
VALUES (DATE '2022/07/06', '10:00', '13:00', '3');
INSERT INTO Availability
VALUES (DATE '2022/07/07', '0:00', '0:00', '3');
INSERT INTO Availability
VALUES (DATE '2022/07/08', '0:00', '0:00', '3');
INSERT INTO Availability
VALUES (DATE '2022/07/09', '9:00', '17:00', '3');
INSERT INTO Availability
VALUES (DATE '2022/07/10', '9:00', '17:00', '3');
INSERT INTO Availability
VALUES (DATE '2022/07/04', '0:00', '0:00', '4');
INSERT INTO Availability
VALUES (DATE '2022/07/05', '9:00', '17:00', '4');
INSERT INTO Availability
VALUES (DATE '2022/07/06', '0:00', '0:00', '4');
INSERT INTO Availability
VALUES (DATE '2022/07/07', '9:00', '17:00', '4');
INSERT INTO Availability
VALUES (DATE '2022/07/08', '9:00', '17:00', '4');
INSERT INTO Availability
VALUES (DATE '2022/07/09', '9:00', '17:00', '4');
INSERT INTO Availability
VALUES (DATE '2022/07/10', '9:00', '17:00', '4');
INSERT INTO Availability
VALUES (DATE '2022/07/04', '0:00', '0:00', '5');
INSERT INTO Availability
VALUES (DATE '2022/07/05', '9:00', '17:00', '5');
INSERT INTO Availability
VALUES (DATE '2022/07/06', '0:00', '0:00', '5');
INSERT INTO Availability
VALUES (DATE '2022/07/07', '9:00', '17:00', '5');
INSERT INTO Availability
VALUES (DATE '2022/07/08', '9:00', '17:00', '5');
INSERT INTO Availability
VALUES (DATE '2022/07/09', '9:00', '17:00', '5');
INSERT INTO Availability
VALUES (DATE '2022/07/10', '9:00', '17:00', '5');

INSERT INTO Roster
VALUES (DATE '2022/07/25', '9:00', '5:00', DATE '2022/07/25', 1);
INSERT INTO Roster
VALUES (DATE '2022/07/26', '9:00', '5:00', DATE '2022/07/25', 1);
INSERT INTO Roster
VALUES (DATE '2022/07/27', '9:00', '5:00', DATE '2022/07/25', 1);
INSERT INTO Roster
VALUES (DATE '2022/07/28', '9:00', '5:00', DATE '2022/07/25', 1);
INSERT INTO Roster
VALUES (DATE '2022/07/29', '9:00', '5:00', DATE '2022/07/25', 1);
INSERT INTO Roster
VALUES (DATE '2022/07/30', '9:00', '5:00', DATE '2022/07/25', 1);
INSERT INTO Roster
VALUES (DATE '2022/07/31', '9:00', '5:00', DATE '2022/07/25', 1);
INSERT INTO Roster
VALUES (DATE '2022/07/25', '9:00', '5:00', DATE '2022/07/25', 2);
INSERT INTO Roster
VALUES (DATE '2022/07/26', '9:00', '5:00', DATE '2022/07/25', 2);
INSERT INTO Roster
VALUES (DATE '2022/07/27', '9:00', '5:00', DATE '2022/07/25', 2);
INSERT INTO Roster
VALUES (DATE '2022/07/28', '9:00', '5:00', DATE '2022/07/25', 2);
INSERT INTO Roster
VALUES (DATE '2022/07/29', '9:00', '5:00', DATE '2022/07/25', 2);
INSERT INTO Roster
VALUES (DATE '2022/07/30', '9:00', '5:00', DATE '2022/07/25', 2);
INSERT INTO Roster
VALUES (DATE '2022/07/31', '9:00', '5:00', DATE '2022/07/25', 2);
INSERT INTO Roster
VALUES (DATE '2022/07/25', '9:00', '5:00', DATE '2022/07/25', 3);
INSERT INTO Roster
VALUES (DATE '2022/07/26', '9:00', '5:00', DATE '2022/07/25', 3);
INSERT INTO Roster
VALUES (DATE '2022/07/27', '9:00', '5:00', DATE '2022/07/25', 3);
INSERT INTO Roster
VALUES (DATE '2022/07/28', '9:00', '5:00', DATE '2022/07/25', 3);
INSERT INTO Roster
VALUES (DATE '2022/07/29', '9:00', '5:00', DATE '2022/07/25', 3);
INSERT INTO Roster
VALUES (DATE '2022/07/30', '9:00', '5:00', DATE '2022/07/25', 3);
INSERT INTO Roster
VALUES (DATE '2022/07/31', '9:00', '5:00', DATE '2022/07/25', 3);