CREATE DATABASE IF NOT EXISTS ROSTER;
USE ROSTER;

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
    emp_id VARCHAR(255),
    emp_fName VARCHAR(255),
    emp_lName VARCHAR(255),
    emp_email VARCHAR(255),
    emp_phNum VARCHAR(255),
    emp_type VARCHAR(50),
    company_id INT,
    PRIMARY KEY(emp_id),
    FOREIGN KEY(company_id) REFERENCES Company(company_id),
    CONSTRAINT types CHECK(emp_type="Casual" OR emp_type="Part-time" OR emp_type="Full-time")
);