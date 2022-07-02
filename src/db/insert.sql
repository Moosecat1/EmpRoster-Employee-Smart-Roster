USE SMARTROSTER;

INSERT INTO Company (company_id, company_name) VALUES ("ewltd2343", "Epic Win Ltd.");

INSERT INTO Employee (emp_id, emp_password, emp_fName, emp_lName, emp_email, emp_phNum, emp_type, emp_privilege, company_id)
    VALUES ("jm336", "secretpword", "Joseph", "Mother", "jm336@epicwin.com", "0123455678", "Part-time", "Employee", "ewltd2343");

INSERT INTO Employee (emp_id, emp_password, emp_fName, emp_lName, emp_email, emp_phNum, emp_type, emp_privilege, company_id)
    VALUES ("et920", "secretpword", "Edwin", "Trombolone", "et920@epicwin.com","0321643991", "Full-time", "Manager", "ewltd2343");

INSERT INTO Employee (emp_id, emp_password, emp_fName, emp_lName, emp_email, emp_phNum, emp_type, emp_privilege, company_id)
    VALUES ("dy001", "secretpword", "Devon", "Yates", "dy001@epicwin.com", "43962131", "Casual", "Admin", "ewltd2343");