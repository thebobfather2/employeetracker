const mysql = require('mysql2');
const inquirer = require('inquirer');
const {printTable} = require('console-table-printer')
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  function mainMenu() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "selection",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
    })
    .then(response => {
        if(response.selection === "view all departments") {
          viewDepartments()
        }
        if(response.selection === "view all roles") {
          viewRoles()
      }
    })
  };

  function viewDepartments() {
    db.query("select * from department", (err, data) => {
        printTable(data);
        mainMenu();
    })
  }

  function viewRoles() {
    db.query("select * from role", (err, data) => {
        printTable(data);
        mainMenu();
    })
  }

  mainMenu();