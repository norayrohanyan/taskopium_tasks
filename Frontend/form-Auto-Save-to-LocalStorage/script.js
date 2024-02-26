const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', () => {
    getLocalStorage();
    
    form.addEventListener('input', () => {
        updateLocalStorage();
    })
})

function updateLocalStorage() {
    const fields = form.querySelectorAll('input');
    fields.forEach(field => {
        localStorage.setItem(field.id, field.value);
        console.log(field.value);
    })
}

function getLocalStorage() {
    const fields = form.querySelectorAll('input');
    fields.forEach(field => {
        field.value = localStorage.getItem(field.id);
    })
}