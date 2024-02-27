// Function to create an employee record from an array
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Function to create employee records from an array of arrays
function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

// Function to add a timeIn event to an employee's record
function createTimeInEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour)
  });
  return employee;
}

// Function to add a timeOut event to an employee's record
function createTimeOutEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour)
  });
  return employee;
}

// Function to calculate the hours worked by an employee on a specific date
function hoursWorkedOnDate(employee, date) {
  const timeInEvent = employee.timeInEvents.find(event => event.date === date);
  const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}

// Function to calculate wages earned by an employee on a specific date
function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  const wage = hoursWorked * employee.payPerHour;
  return wage;
}

// Function to calculate the total payroll for all employees
function calculatePayroll(employees) {
  const totalPayroll = employees.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
  return totalPayroll;
} 

// Function to calculate all wages for an employee
function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map(event => event.date);
  const totalWages = datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employee, date);
  }, 0);
  return totalWages;
}