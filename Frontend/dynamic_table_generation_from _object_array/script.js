const employees = [
    {
      id: 1,
      name: "John Doe",
      age: 30,
      department: "Engineering",
      role: { title: "Frontend Developer", level: "Mid" },
      contact: { email: "john.doe@example.com", phone: "123-456-7890" },
      skills: ["JavaScript", "React", "CSS"]
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      department: "Design",
      role: { title: "UI/UX Designer", level: "Senior" },
      contact: { email: "jane.smith@example.com", phone: "098-765-4321" },
      skills: ["Figma", "Sketch", "Adobe XD"]
    }
];

function generateTableHeader() {
    const thead = document.querySelector('thead');
    const tr = document.createElement('tr');

    Object.keys(employees[0]).forEach(key => {
        if (typeof employees[0][key] == 'object' && !Array.isArray(employees[0][key])) {
            Object.keys(employees[0][key]).forEach(subKey => {
                const th = document.createElement('th');
                th.textContent = `${key} ${subKey}`;
                tr.appendChild(th);
            })
        }
        else {
            const th = document.createElement('th');
            th.textContent = key;
            tr.appendChild(th);
        }
    });
    
    thead.appendChild(tr);
}

function generateTableData() {
    const tbody = document.querySelector('tbody');

    employees.forEach(employee => {
        const tr = document.createElement('tr');

        Object.values(employee).forEach(value => {
            const td = document.createElement('td');
            if (Array.isArray(value)) {
                td.textContent = value.join(', ');
                tr.appendChild(td);
            } 
             else if (typeof value === 'object') {
                Object.values(value).forEach(subValue => {
                    const subTd = document.createElement('td');
                    subTd.textContent = subValue;
                    tr.appendChild(subTd);
                });
            }  else {
                td.textContent = value;
                tr.appendChild(td);
            }
        });

        tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generateTableHeader();
    generateTableData();
});
