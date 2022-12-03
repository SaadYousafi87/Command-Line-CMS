const connection = require('./db/connection.js');
const inquirer = require("inquirer");
const {table} = require('table');

function menu(){
    return inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to choose',
            choices: ['View all departments', 'View all roles', 'View all employees', 
            'Add department', 'Add role', 'Add employee', 'Update employee role', 'Exit'],
            name: 'option',
        }
    ])
    .then( ({option}) => {
        switch(option){
            case 'View all departments':
                connection.query(
                    `select * from department`, function(err, result){
                        if(err){
                            console.log(err);
                        }
                        formatedResult = result.map(obj => Object.values(obj));
                        formatedResult.unshift(['id', 'department']);
                        console.log(table(formatedResult));
                        menu();
                    }
                );
                break;

            case 'View all roles':
                connection.query(
                    `select roles.id, title, name, salary 
                    from roles inner join department 
                    on roles.department_id = department.id;`, function(err, result){
                        if(err){
                            console.log(err);
                        }
                        formatedResult = result.map(obj => Object.values(obj));
                        formatedResult.unshift(['id', 'title', 'department', 'salary']);
                        console.log(table(formatedResult));
                        menu();
                    }
                );
                break;

            case 'View all employees':
                connection.query(
                    `Select employee.id, first_name, last_name, title, department.name, salary
                    from employee
                    join roles on employee.role_id = roles.id
                    join department on roles.department_id = department.id;`, function(err, result){
                        if(err){
                            console.log(err);
                        }
                        formatedResult = result.map(obj => Object.values(obj));
                        formatedResult.unshift(['id', 'first_name', 'last_name', 'title', 'department', 'salary']);
                        console.log(table(formatedResult));
                        menu();
                    }
                );
                break;

            case 'Add department':
                console.log('Add a department function called');
                addDepartment();
                break;

            case 'Add role':
                console.log('Add a role function called');
                addRole();
                break;

            case 'Add employee':
                console.log('Add an employee function called');
                addEmployee();
                break;

            case 'Update employee role':
                console.log('Update an employee role function called');
                updateEmployeeRole();
                break;
        }
    });
}


// function to add department
function addDepartment(){
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'name',
        }
    ])
    .then(answer => {
        // code to add department name into database
        connection.query(
            `insert into department set ?`, 
            [
                {
                    name: answer.name,
                }
            ], 
            function(err, result){
                if(err){
                    console.log(err);
                }
                menu();
            }
        );
    });
}


// function to add roles
function addRole(){
    var optionArr = [];
    connection.query(`select name from department`, function(err, result){
        if(err){
            console.log(err);
        }
        for(var i=0; i < result.length; i++){
            optionArr.push(result[i].name);
        }
    });

    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'role',
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'salary',
        },
        {
            type: 'list',
            message: 'Which department does the role belong to?',
            choices: optionArr,
            name: 'option',
        }
    ])
    .then(answers => {
        var department_id;
        connection.query(`select id from department where name=?`, answers.option, function(err, result){
            if(err){
                console.log(err);
            }
            department_id = result[0].id;
        });

        connection.query(`insert into roles set ?`,
        [
            {
                title: answers.role,
                salary: answers.salary,
                department_id: department_id
            }
        ], function(err, result){
            if(err){
                console.log(err);
            }
            console.log(department_id);
            menu();
        });
    });
}

// function to add employee
function addEmployee(){
    var roleArray = [];
    var managerArray = [];

    connection.query(`select title from roles`, function(err, result){
        if(err){
            console.log(err);
        }
        for(var i=0; i < result.length; i++){
            roleArray.push(result[i].title);
        }
    });

    connection.query(`select first_name from employee`, function(err, result){
        if(err){
            console.log(err);
        }
        for(var i=0; i < result.length; i++){
            managerArray.push(result[i].first_name);
        }
    });

    return inquirer.prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'firstName',
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'lastName',
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            choices: roleArray,
            name: 'role',
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            choices: managerArray,
            name: 'manager',
        }
    ])
    .then(answers => {
        var role_id;
        var manager_id;
        connection.query(`select id from roles where title=?`, answers.role, function(err, result){
            if(err){
                console.log(err);
            }
            role_id = result[0].id;
        });
        connection.query(`select id from employee where first_name=?`, answers.manager, function(err, result){
            if(err){
                console.log(err);
            }
            manager_id = result[0].id;
        });
        
        connection.query(`insert into employee set ?`,
        [
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: role_id,
                manager_id: manager_id,
            }
        ], function(err, result){
            if(err){
                console.log(err);
            }
            console.log('Employee added');
            menu();
        });
    });
}

// function to update employee
function updateEmployeeRole(){
    var employeeArray = [];
    var roleArray = [];
    connection.query(`select first_name from employee`, function(err, result){
        if(err){
            console.log(err);
        }
        for(var i=0; i < result.length; i++){
            employeeArray.push(result[i].first_name);
        }
    });

    connection.query(`select title from roles`, function(err, result){
        if(err){
            console.log(err);
        }
        for(var i=0; i < result.length; i++){
            roleArray.push(result[i].first_name);
        }
    });

    return inquirer.prompt([
        {
            type: 'list',
            message: "Which employee's role do you want to update?",
            choices: employeeArray,
            name: 'employee',
        },
        {
            type: 'list',
            message: "Which role do you want to assign the selected employee?",
            choices: roleArray,
            name: 'role',
        }
    ])
    .then(answers => {
        var role_id;
        connection.query(`select id from roles where title=?`, answers.role, function(err, result){
            if(err){
                console.log(err);
            }
            role_id = result[0].id;
        });

        menu();
    });
}

menu();


