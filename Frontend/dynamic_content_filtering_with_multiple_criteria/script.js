const products = [
    { id: 1, name: "Eco-friendly Water Bottle", category: "Home", price: 15, tags: ["eco-friendly", "new"] },
    { id: 2, name: "Organic Cotton T-shirt", category: "Apparel", price: 25, tags: ["eco-friendly"] },
    { id: 3, name: "Wireless Headphones", category: "Electronics", price: 200, tags: ["new", "sale"] },
];


function displayCategories() {
    const parent = document.getElementById('category');
    const option = document.createElement('option');
    option.value = 'all';
    option.textContent = 'All';
    parent.appendChild(option);
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.category.toLocaleLowerCase();
        option.textContent = product.category;
        parent.appendChild(option);
    })
}

function getTags() {
    const tags = [];
    products.forEach(product => {
        product.tags.forEach(tag => {
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        })
    })
    return tags;
}

function displayTags() {
    const parent = document.querySelector('.tags');
    const tags = getTags();
    tags.forEach(tag => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('id', tag);
        const label = document.createElement('label');
        label.setAttribute('for', tag);
        label.textContent = tag;

        checkbox.addEventListener('change', () => {
            filterByTags(checkbox.checked, checkbox.id);
        })

        parent.appendChild(checkbox);
        parent.appendChild(label);
    })
}

function displayProducts(products) {
    const content = document.querySelector('.content');
    content.innerHTML = '';
    products.forEach(product => {
        const parent = document.createElement('div');
        parent.className = 'product';
        Object.entries(product).forEach(([key, value]) => {
            const text = document.createElement('p');
            text.textContent = `${key}: ${value} `;
            parent.appendChild(text);
        })
        content.appendChild(parent);
    })
}

function filterByCategories() {
    const category = document.getElementById('category').value;
    if (category == 'all') {
        displayProducts(products);
        return;
    }
    const data = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    displayProducts(data); 
    return data;
}

function filterByTags(checked, tagId) {
    const category = document.getElementById('category').value;

    if (checked) {
        const data = products.filter(product => product.tags.includes(tagId));
        if (category !== 'all') {
            const filteredData = data.filter(product => product.category.toLowerCase() === category.toLowerCase());
            displayProducts(filteredData);
        } else {
            displayProducts(data);
        }
    } else {
        filterByCategories();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    displayCategories();
    displayTags();
    filterByCategories();
})

document.getElementById('category').addEventListener('change', () => {
    filterByCategories();
})

