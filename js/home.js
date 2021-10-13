window.addEventListener("DOMContentLoaded", (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    let empPayrollList = createEmployeePayrollJSON();
    for(const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}


    <tr>
        <td><img class="profile" alt="" src="${empPayrollData._picture}"></td>
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
const createEmployeePayrollJSON = () => {
    let employeeListLocal = [{
            _name: "Narayan",
            _gender: "Male",
            _department: ["Finance", "Sales"],
            _salary: "700000",
            _startDate: "26 Jan 2018",
            _note: "",
            _id: new Date().getTime(),
            _picture: "../assets/profile-images/Ellipse -5.png"
        },
        {
            _name: "Shruthi",
            _gender: "Female",
            _department: ["sales", "Engineering"],
            _salary: "750000",
            _startDate: "17 Dec 2018",
            _note: "",
            _id: new Date().getTime() + 1,
            _picture: "../assets/profile-images/Ellipse -7.png"
        },
        {
            _name: 'Amarpa Shashanka Keerthi Kumar',
            _gender: 'Female',
            _department: [
                'Sales'
            ],
            _salary: 400800,
            _startDate: '29 Oct 2019',
            _note: '',
            id: new Date().getTime() + 1,
            _picture: "../assets/profile-images/Ellipse -1.png"
        }
    ];
    return employeeListLocal;
};

const getDeptHtml = (departmentList) => {
    let deptHtml = "";
    for (const dept of departmentList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}; 