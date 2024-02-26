function addField() {
    const fieldType = document.getElementById("field-type").value;
    const fieldLabel = prompt("Enter field label:");
    const newField = document.createElement("div");
    newField.className = "draggable";
    newField.draggable = true; 
    newField.addEventListener('dragstart', dragStart);
    newField.addEventListener('dragover', dragOver);
    newField.addEventListener('drop', drop);
    
    const newFieldLabel = document.createElement("label");
    newFieldLabel.textContent = fieldLabel;
    newField.appendChild(newFieldLabel);

    if (fieldType === "text" || fieldType === "email" || fieldType === "password") {
        const fieldInput = document.createElement("input");
        fieldInput.type = fieldType;
        newField.appendChild(fieldInput);
    } else if (fieldType === "dropdown") {
        const options = prompt("Enter options separated by commas:").split(",");
        const select = document.createElement("select");
        options.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.textContent = option;
            select.appendChild(optionElement);
        })
        newField.appendChild(select);
    } else if (fieldType === "checkbox") {
        const fieldInput = document.createElement("input");
        fieldInput.type = fieldType;
        newField.appendChild(fieldInput);
    } else if (fieldType === "radio") {
        const groupName = prompt("Enter the group name:");
        const options = prompt("Enter options separated by commas:").split(",");
        options.forEach(option => {
            const fieldInput = document.createElement("input");
            fieldInput.type = fieldType;
            fieldInput.name = groupName;
            const fieldLabel = document.createElement("label");
            fieldLabel.textContent = option;
            const div = document.createElement("div"); 
            div.appendChild(fieldInput);
            div.appendChild(fieldLabel);
            newField.appendChild(div);
        });
    }
    document.getElementById("form-fields").appendChild(newField);
}

function exportForm() {
    const formFields = document.getElementById("form-fields").querySelectorAll(".draggable");
    const formData = [];
    
    formFields.forEach(field => {
        const fieldType = field.querySelector("input, select").type;
        const fieldLabel = field.querySelector("label").textContent;
        const fieldOptions = [];
        
        if (fieldType === "checkbox" || fieldType === "radio") {
            const options = field.querySelectorAll("input[type=checkbox], input[type=radio]");
            options.forEach(option => {
                fieldOptions.push({
                    label: option.parentElement.querySelector("label").textContent,
                    checked: option.checked
                });
            });
        }
        
        formData.push({
            type: fieldType,
            label: fieldLabel,
            options: fieldOptions
        });
    });
    
    const jsonData = JSON.stringify(formData);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "form_configuration.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

let dragged;

function dragStart(event) {
    dragged = event.target;
    event.dataTransfer.setData('text/html', dragged.innerHTML);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    if (event.target.className === 'draggable') {
        event.target.parentNode.insertBefore(dragged, event.target.nextSibling);
    } else {
        event.target.parentNode.insertBefore(dragged, event.target);
    }
}


function importForm(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const formData = JSON.parse(e.target.result);
        
        formData.forEach(field => {
            const newField = document.createElement("div");
            newField.className = "draggable";
            const newFieldLabel = document.createElement("label");
            newFieldLabel.textContent = field.label;
            newField.appendChild(newFieldLabel);

            if (field.type === "text" || field.type === "email" || field.type === "password") {
                const fieldInput = document.createElement("input");
                fieldInput.type = field.type;
                newField.appendChild(fieldInput);
            } else if (field.type === "dropdown") {
                const select = document.createElement("select");
                field.options.forEach(option => {
                    const optionElement = document.createElement("option");
                    optionElement.textContent = option.label;
                    select.appendChild(optionElement);
                });
                newField.appendChild(select);
            } else if (field.type === "checkbox" || field.type === "radio") {
                field.options.forEach(option => {
                    const fieldInput = document.createElement("input");
                    fieldInput.type = field.type;
                    fieldInput.checked = option.checked;
                    const fieldLabel = document.createElement("label");
                    fieldLabel.textContent = option.label;
                    const div = document.createElement("div"); 
                    div.appendChild(fieldInput);
                    div.appendChild(fieldLabel);
                    newField.appendChild(div);
                });
            }
            
            document.getElementById("form-fields").appendChild(newField);
        });
    };
    
    reader.readAsText(file);
}
