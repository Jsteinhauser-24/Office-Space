const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = 3001;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jms_1470.',
    database: 'himym_employees_db',
},
console.log('connected to db')
);

function start() {
    inquirer 
        .prompt({
            name: 'action',
            type: 'list',
            message: 'Please pick one action',
            choices: [
                'View all Departments',
                'View all Jobs',
                'View all Employees',
                'Add a Department',
                'Add a Job',
                'Add an Employee',
                'Update Employee',
                'Cancel',
            ],
        }).then((answer) => {
            switch (answer.action) {
                case 'View all Departments': viewDepartment();
                    break;
                case 'View all Jobs': viewJob();
                    break;
                case 'View all Employees': viewEmployee();
                    break;
                case 'Add a Department': addDepartment();
                    break;
                case 'Add a Job': addJob();
                    break;
                case 'Add an Employee': addEmployee();
                    break;
                case 'Update Employee': updateEmployee();
                    break;
                case "Cancel": db.end();
                    break;
            }
        });
}
function viewDepartment() {
    const query = "SELECT * FROM department";
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the department',
            name: 'department_name'
        }
    ]).then(function(res) {
        const query = db.query('INSERT INTO department SET ?', {
            department_name: res.department_name
        },
        function (err, res) {
            if (err) throw err;
            console.log ('Department added');
            start();
        })
    })
}
function viewJob() {
    const query = 'SELECT * FROM job';
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addJob() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter Job Title',
            name: 'title'
        },
        {
            type: "input",
            message: "Enter Job's Salary:",
            name: "salary"
        },
        {
            type: "input",
            message: "Enter the department ID this Job belongs to:",
            name: "department_id"
        }
    ]).then(function(res) {
        const query = db.query(
            'INSERT INTO job SET ?',{
                title: res.title,
                salary: res.salary,
                department_id: res.department_id,
            },
            function (err, res) {
                if (err) throw err;
                console.log('Job added');
                start();
            })
    })
}
function viewEmployee() {
    const query = "SELECT * FROM employee";
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}
function addEmployee() {
    inquirer.prompt([
        {
        type: 'input',
        message: "Enter Employee's First Name",
        name: 'first_name'
        },
        {
            type: 'input',
            message: "Enter Employe's Last Name",
            name: 'last_name'
        },
        {
            type: 'input',
            message: "Enter Employee's Job id",
            name: 'job_id'
        },
        {
            type: 'input',
            message: "If the Employee has a Manager, enter the Manger's id",
            name: 'manager_id'
        }
    ]).then(function (res) {
        if (res.manager_id === '') {
            res.manager_id = null;
        }
        const query = db.query(
            "INSERT INTO employee SET ?",
            {
                first_name: res.first_name,
                last_name: res.last_name,
                job_id: res.job_id,
                manager_id: res.manager_id
            },
            function (err, res) {
                if (err) throw err;
                console.log('Employee added');
                start();
            }
        )
    })
}

function updateEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Enter Employee's id to Update",
            name: 'employee_id'
        },
        {
            type: 'Input',
            message: "Enter Employee's new Job id",
            name: 'job_id'
        }
    ]).then(function (res) {
        const query = "UPDATE employee SET job_id = ? WHERE id = ?";
        db.query(query, [res.job_id, res.employee_id], function (err, res) {
            if (err) throw err;
            console.log('Employee Updated');
            start();
        });
    });
}

start();