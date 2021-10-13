let empPayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
    empPayrollList = getEmployeePayrollFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});
const getEmployeePayrollFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
    if(empPayrollList.length ==0) return;
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    //let empPayrollList = createEmployeePayrollJSON();
    for(const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}


    <tr>
        <td><img class="profile" alt="" src="${empPayrollData._profilePic}"></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${(getDeptHtml(empPayrollData._department))}
        <td>${empPayrollData._salary}</td>
        <td>${empPayrollData._startDate}</td>
        <td>
            <img id="1" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
            <img id="1" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
        </td>
    </tr>
     `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const getDeptHtml = (departmentList) => {
    let deptHtml = "";
    for (const dept of departmentList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}; 