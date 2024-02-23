const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 },
];

function displayBooks(books) {
    const container = document.querySelector(".container");
    container.innerHTML = "";
    if (books.length == 0) {
        const p = document.createElement('p');
        p.textContent = 'No books found';
        container.appendChild(p);
        return;
    }
    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        Object.entries(book).forEach(([key, value]) => {
            const div = document.createElement('div');
            div.className = 'book-info';
            const k = document.createElement('strong');
            const v = document.createElement('span');
            k.textContent = `${key}: `;
            v.textContent = `${value} `;
            div.appendChild(k);
            div.appendChild(v);
            card.appendChild(div);
        })
        container.appendChild(card);
    })  
}

function getQuery(query) {
    return query.toLocaleLowerCase().split(' ').join('');
}

function searchBooks(query) {
    const key = getQuery(query);
    return filteredBooks = books.filter(book => {
        title = getQuery(book.title).includes(key);
        author = getQuery(book.author).includes(key);
        return title || author;
    });
}

document.addEventListener("input" , (event) => {
    const results = searchBooks(event.target.value);
    displayBooks(results);
});

displayBooks(books);