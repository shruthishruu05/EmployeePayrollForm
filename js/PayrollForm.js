let isUpdate = 1;
let employeePayrollObj = {};

window.addEventListener("DOMContentLoaded", (event) => {
  const name = document.getElementById("name");
  const textError = document.querySelector(".text-error");
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      textError.textContent = "";
      return;
    }
    try {
      new EmployeePayroll().name = name.value;
      textError.textContent = "";
    } catch (e) {
      textError.textContent = e;
    }
  });

  const salary = document.querySelector("#salary");
  const output = document.querySelector(".salary-output");
  output.textContent = salary.value;
  salary.addEventListener("input", function () {
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

  checkForUpdate();
});

const checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem("editEmp");
  isUpdate = employeePayrollJson ? true : false;
  if (!isUpdate) return;
  employeePayrollObj = JSON.parse(employeePayrollJson);
  setForm();
};

const setForm = () => {
  setValue("#name", employeePayrollObj._name);
  setSelectedValues("[name=profile]", employeePayrollObj._profilePic);
  setSelectedValues("[name=gender]", employeePayrollObj._gender);
  setSelectedValues("[name=department", employeePayrollObj._department);
  setValue("#salary", employeePayrollObj._salary);
  setTextValue(".salary-output", employeePayrollObj._salary);
  setValue("#notes", employeePayrollObj._note);
  let date = stringifyDate(employeePayrollObj._startDate).split("/");
  setValue("#day", date[0].replace(/^0+/, ""));
  setValue("#month", date[1].replace(/^0+/, ""));
  setValue("#year", date[2]);
};

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach((item) => {
    if (Array.isArray(value)) {
      if (value.includes(item.value)) {
        item.checked = true;
      }
    } else if (item.value == value) {
      item.checked = true;
    }
  });
};

const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  try {
    setEmployeePayrollObject();
    createAndUpdateStorage();
    resetForm();
    window.location.replace(site_properties.home_page);
  } catch (e) {
    console.error(e);
    return;
  }
};

const setEmployeePayrollObject = () => {
  employeePayrollObj._name = getInputValueById("#name");
  employeePayrollObj._profilePic = getSelectedValues("[name=profile]").pop();
  employeePayrollObj.gender = getSelectedValues("[name=gender]").pop();
  employeePayrollObj.department = getSelectedValues("[name=department]");
  employeePayrollObj.salary = getInputValueById("#salary");
  employeePayrollObj.note = getInputValueById("#notes");
  let date =
    getInputValueById("#year") +
    "-" +
    getInputValueById("#month") +
    "-" +
    getInputValueById("#day");
  employeePayrollObj.startDate = new Date(Date.parse(date));
};

const createAndUpdateStorage = () => {
  let employeePayrollList = JSON.parse(
    localStorage.getItem("EmployeePayrollList")
  );

  if (employeePayrollList) {
    let empPayrollData = employeePayrollList.find(
      (empData) => empData._id == employeePayrollObj._id
    );

    if (!empPayrollData) {
      employeePayrollList.push(createEmployeePayroll());
    } else {
      const index = employeePayrollList
        .map((empData) => empData._id)
        .indexOf(empPayrollData._id);
      employeePayrollList.splice(
        index,
        1,
        createEmployeePayroll(empPayrollData._id)
      );
    }
  } else {
    employeePayrollList = [createEmployeePayroll()];
  }
  localStorage.setItem(
    "EmployeePayrollList",
    JSON.stringify(employeePayrollList)
  );
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

const createEmployeePayroll = (id) => {
  let employeePayrollData = new EmployeePayroll();
  if (!id) employeePayrollData._id = new Date().getTime();
  else employeePayrollData._id = id;
  setEmployeePayrollData(employeePayrollData);
  return employeePayrollData;
};

const setEmployeePayrollData = (employeePayrollData) => {
  try {
    employeePayrollData.name = getInputValueById("#name");
  } catch (e) {
    setTextValue(".text-error", e);
    throw e;
  }

  employeePayrollData.profilePic = getSelectedValues("[name=profile]").pop();
  employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
  employeePayrollData.department = getSelectedValues("[name=department]");
  employeePayrollData.salary = getInputValueById("#salary");
  employeePayrollData.note = getInputValueById("#notes");
  let date =
    getInputValueById("#year") +
    "-" +
    getInputValueById("#month") +
    "-" +
    getInputValueById("#day");
  employeePayrollData.startDate = new Date(Date.parse(date));
  alert(employeePayrollData.toString());
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