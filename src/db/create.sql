CREATE DATABASE IF NOT EXISTS SMARTROSTER;
USE SMARTROSTER;

CREATE TABLE Company(
    company_id INT NOT NULL AUTO_INCREMENT,
    company_name VARCHAR(255),
    PRIMARY KEY(company_id)
);

CREATE TABLE OperatingTime(
    day_name VARCHAR(15),
    start_time TIME,
    end_time TIME,
    company_id INT,
    FOREIGN KEY(company_id) REFERENCES Company(company_id),
    CONSTRAINT days CHECK(day_name="Sunday" OR day_name="Monday" OR day_name="Tuesday" OR day_name="Wednesday" OR day_name="Thursday" OR day_name="Friday" OR day_name="Saturday")
);

CREATE TABLE Employee(
    emp_id INT NOT NULL AUTO_INCREMENT,
    emp_fName VARCHAR(255),
    emp_lName VARCHAR(255),
    emp_email VARCHAR(255),
    emp_phNum VARCHAR(255),
    emp_type VARCHAR(50),
    emp_privilege VARCHAR(50),
    company_id INT,
    PRIMARY KEY(emp_id),
    FOREIGN KEY(company_id) REFERENCES Company(company_id),
    CONSTRAINT types CHECK(emp_type="Casual" OR emp_type="Part-time" OR emp_type="Full-time"),
    CONSTRAINT privileges CHECK(emp_privilege="Employee" OR emp_privilege="Manager" OR emp_privilege="Admin")
);

CREATE TABLE Availability(
    avail_date DATE,
    avail_start TIME,
    avail_end TIME,
    emp_id INT,
    FOREIGN KEY(emp_id) REFERENCES Employee(emp_id)
);

CREATE TABLE Roster(
    rost_date DATE,
    rost_start TIME,
    rost_end TIME,
    rost_week_start DATE,
    emp_id INT,
    FOREIGN KEY(emp_id) REFERENCES Employee(emp_id)
);