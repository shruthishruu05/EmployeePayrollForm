window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  const textError = document.querySelector('.text-error');
  name.addEventListener('input', function() {
      if (name.value.length == 0) {
          textError.textContent = "";
          return;
      }
      try {
          (new EmployeePayroll()).name = name.value;;
          textError.textContent = "";
      } catch (e) {
          textError.textContent = e;
      }

  });

  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input',function() {
      output.textContent = salary.value;
  });


  var date = document.getElementById("day");
var month = document.getElementById("month");
var year = document.getElementById("year");
const dateError = document.querySelector(".date-error");
date.addEventListener("change", validateDate);
month.addEventListener("change", validateDate);
year.addEventListener("change", validateDate);

function validateDate() {
  let startDate = Date.parse(
    year.value + "-" + month.value + "-" + date.value
  );
  try {
    new EmployeePayroll().startDate = startDate;
    dateError.textContent = "";
  } catch (e) {
    dateError.textContent = e;
  }
}
});

const save = (event) => {
  try {
    let employeePayroll = createEmployeePayroll();
    createAndUpdateStorage(employeePayroll);
  } catch (e) {
    return;
  }
};

function createAndUpdateStorage(employeePayroll) {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if (employeePayrollList != undefined) {
      employeePayrollList.push(employeePayroll);
  } else {
      employeePayrollList = [employeePayroll];
  }
  alert(employeePayrollList.toString());
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayroll = () => {
  let employeePayroll = new EmployeePayroll();
  try {
      employeePayroll.name = getInputValueById("#name");
  } catch (e) {
    setTextValue(".text-error", e);
    throw e;
  }

  employeePayroll.profilePic = getSelectedValues("[name=profile]").pop();
  employeePayroll.gender = getSelectedValues("[name=gender]").pop();
  employeePayroll.department = getSelectedValues("[name=department]");
  employeePayroll.salary = getInputValueById("#salary");
  employeePayroll.note = getInputValueById("#notes");
  let date =
  getInputValueById("#year") +
  "-" +
  getInputValueById("#month") +
  "-" +
  getInputValueById("#day");
employeePayroll.startDate = new Date(Date.parse(date));
  alert(employeePayroll.toString());
  return employeePayroll;
};


const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach((item) => {
    if (item.checked) selItems.push(item.value);
  });
  return selItems;
};

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
};

const getInputElementValue = (id) => {
  let value = document.getElementById(id).value;
  return value;
};

const resetForm = () => {
  setValue("#name", "");
  unsetSelectedValues("[name=profile]");
  unsetSelectedValues("[name=gender");
  unsetSelectedValues("[name=department");
  setValue("#salary", "");
  setValue("#notes", "");
  setValue("#day", "1");
  setValue("#month", "1");
  setValue("#year", "2021");
  setTextValue(".salary-output", "400000");
};

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach((item) => {
    item.checked = false;
  });
};

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
};

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
};