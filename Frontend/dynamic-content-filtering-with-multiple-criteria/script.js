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
            filterProducts(checkbox.checked, checkbox.id);
        })

        parent.appendChild(checkbox);
        parent.appendChild(label);
    })
}

function displayProducts(products) {
    const content = document.querySelector('.content');
    content.innerHTML = '';
    if(products.length > 0) {
        products.forEach(product => {
            const parent = document.createElement('div');
            parent.className = 'product';
            Object.entries(product).forEach(([key, value]) => {
                const div = document.createElement('div');
                div.className = 'product-info';
                const title = document.createElement('strong');
                const val = document.createElement('span');
                title.textContent = `${key}: `;
                val.textContent = `${value} `;
                div.appendChild(title);
                div.appendChild(val);
                parent.appendChild(div);
            })
            content.appendChild(parent);
        })
    }   
    else {
        const text = document.createElement('p');
        text.textContent = 'No products found';
        content.appendChild(text);
    }
}

function filterProducts() {
    const category = document.getElementById('category').value;
    const selectedTags = Array.from(document.querySelectorAll('.tags input:checked')).map(input => input.id);

    let filteredProducts = products;

    if (selectedTags.length > 0) {
        filteredProducts = filteredProducts.filter(product => selectedTags.every(tag => product.tags.includes(tag)));
    }

    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }

    displayProducts(filteredProducts);
}


document.addEventListener('DOMContentLoaded', () => {
    displayCategories();
    displayTags();
    displayProducts(products);
})

document.getElementById('category').addEventListener('change', () => {
    filterProducts();
})
