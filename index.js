// Helper function to parse date and time from the timestamp string
function parseTimestamp(timestamp) {
    const [date, time] = timestamp.split(" ");
    const [year, month, day] = date.split("-").map(Number);
    const [hour, minutes] = time.split(":").map(Number);
    return { year, month, day, hour, minutes };
  }

  function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }

  function createEmployeeRecords(employeesArray) {
    return employeesArray.map(createEmployeeRecord);
  }

  function createTimeInEvent(employee, timeStamp) {
    const [date, time] = timeStamp.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(time, 10),
    });
    return employee;
  }

  function createTimeOutEvent(employee, timeStamp) {
    const [date, time] = timeStamp.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(time, 10),
    });
    return employee;
  }

  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find((event) => event.date === date);
    const timeOut = employee.timeOutEvents.find((event) => event.date === date);

    if (timeIn && timeOut) {
      const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
      return hoursWorked;
    } else {
      return 0;
    }
  }

  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }

  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce(
      (total, date) => total + wagesEarnedOnDate(employee, date),
      0
    );
    return totalWages;
  }

  function calculatePayroll(employeesArray) {
    return employeesArray.reduce(
      (totalPayroll, employee) => totalPayroll + allWagesFor(employee),
      0
    );
  }

 
