const inquirer = require("inquirer");

function menu(){
    return inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to choose',
            choices: ['View all departments', 'View all roles', 'View all employees', 
            'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
            name: 'option',
        }
    ])
    .then( ({option}) => {
        switch(option){
            case 'View all departments':
                console.log('Show all department function called');
                menu();
                break;
            case 'View all roles':
                console.log('Show all roles function called');
                menu();
                break;
            case 'View all employees':
                console.log('Show all employees function called');
                menu();
                break;
            case 'Add a department':
                console.log('Add a department function called');
                addDepartment();
                break;
            case 'Add a role':
                console.log('Add a role function called');
                addRole();
                break;
            case 'Add an employee':
                console.log('Add an employee function called');
                addEmployee();
                break;
            case 'Update an employee role':
                console.log('Update an employee role function called');
                updateEmployeeRole();
                break;
        }
    });
}

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
        console.log(`Added ${answer.name} to the database`);
        menu();
    });
}

function addRole(){
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
            choices: ['Tngineering', 'Finance', 'Legal', 'Sales', 'Service'],
            name: 'option',
        }
    ])
    .then(answers => {
        console.log(`${answers.role} ${answers.salary} ${answers.option}`);
        menu();
    });
}

function addEmployee(){
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
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'ACcountant', 'Legal Team Lead', 'Lawyer', 'Customer Service'],
            name: 'role',
        },
        {
            type: 'list',
            message: "Who id the employee's manager?",
            choices: ['None', 'John Doe', 'Mike Chan', 'Ashley Rodriquez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown'],
            name: 'manager',
        }
    ])
    .then(answers => {
        console.log(`${answers.firstName} ${answers.lastName} ${answers.role} ${answers.manager}`);
        menu();
    });
}

function updateEmployeeRole(){
    return inquirer.prompt([
        {
            type: 'list',
            message: "Which employee's role do you want to update?",
            choices: ['John Doe', 'Mike Chan', 'Ashley Rodriquez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown', 'Sarah Lourd'],
            name: 'employee',
        },
        {
            type: 'list',
            message: "Which role do you want to assign the selected employee?",
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead'],
            name: 'role',
        }
    ])
    .then(answers => {
        console.log(`${answers.employee} ${answers.role}`);
        menu();
    });
}

menu();


