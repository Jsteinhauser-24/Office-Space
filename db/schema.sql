DROP DATABASE IF EXISTS himym_employees_db;
CREATE DATABASE himym_employees_db;
USE himym_employees_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE job (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    job_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (job_id)
    REFERENCES job (id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);