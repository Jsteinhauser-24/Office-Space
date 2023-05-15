INSERT INTO department(id, department_name)
VALUES (1, 'New York');

INSERT INTO job (id, title, salary, department_id)
VALUES
(1, 'Architect', 100000, 1),
(2, 'Lawyer', 130000, 1),
(3, 'Newscaster', 200000, 1),
(4, 'Kindergarten Teacher', 45000, 1),
(5, 'Please', 1000000, 1);

INSERT INTO employee (id, first_name, last_name, job_id, manager_id)
VALUES
(1, 'Ted', 'Mosby', 1, NULL),
(2, 'Marshall', 'Eriksen', 2, NULL),
(3, 'Robin', 'Scherbatzky', 3, NULL),
(4, 'Lily', 'Aldrin', 4, NULL),
(5, 'Barney', 'Stinson', 5, NULL),
(6, 'Hammond', 'Druthers', 1, NULL),
(7, 'Sandy', 'Rivers', 3, NULL),
(8, 'Brad', 'Morris', 2, NULL);