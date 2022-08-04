CREATE DATABASE IF NOT EXISTS SMARTROSTER;
USE SMARTROSTER;

CREATE TABLE Company(
    company_id VARCHAR(50) NOT NULL,
    company_name VARCHAR(255),
    PRIMARY KEY(company_id)
);

CREATE TABLE CompanyEvent(
    event_date DATE,
    event_start TIME,
    event_end TIME,
    event_name VARCHAR(225),
    company_id VARCHAR(50),
    FOREIGN KEY(company_id) REFERENCES Company(company_id)
);

CREATE TABLE Employee(
    emp_id VARCHAR(50) NOT NULL,
    emp_password VARCHAR(255),
    emp_fName VARCHAR(255),
    emp_lName VARCHAR(255),
    emp_email VARCHAR(255),
    emp_phNum VARCHAR(255),
    emp_type VARCHAR(50),
    emp_privilege VARCHAR(50),
    company_id VARCHAR(50),
    PRIMARY KEY(emp_id),
    FOREIGN KEY(company_id) REFERENCES Company(company_id),
    CONSTRAINT types CHECK(emp_type="Casual" OR emp_type="Part-time" OR emp_type="Full-time"),
    CONSTRAINT privileges CHECK(emp_privilege="Employee" OR emp_privilege="Manager" OR emp_privilege="Admin")
);

CREATE TABLE RegularAvailability(
    day_name VARCHAR(255),
    reg_start TIME,
    reg_end TIME,
    emp_id VARCHAR(50) NOT NULL,
    FOREIGN KEY(emp_id) REFERENCES Employee(emp_id),
    CONSTRAINT days CHECK(day_name="Sunday" OR day_name="Monday" OR day_name="Tuesday" OR day_name="Wednesday" OR day_name="Thursday" OR day_name="Friday" OR day_name="Saturday")
);

CREATE TABLE Availability(
    avail_date DATE,
    avail_start TIME,
    avail_end TIME,
    avail_type VARCHAR(225),
    emp_id VARCHAR(50) NOT NULL,
    FOREIGN KEY(emp_id) REFERENCES Employee(emp_id),
    CONSTRAINT avail_types CHECK(avail_type="Unavailable" OR avail_type="Available")
);

CREATE TABLE Roster(
    rost_date DATE,
    rost_start TIME,
    rost_end TIME,
    rost_week_start DATE,
    emp_id VARCHAR(50) NOT NULL,
    FOREIGN KEY(emp_id) REFERENCES Employee(emp_id)
);