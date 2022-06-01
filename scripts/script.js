const LIBRARY = [
    `
        <div class="book">
        <h3>the ramayana</h3>
        <div class="details flex">
            <p class="pages">1000 pages</p>

            <div class="actions" data-value="0">
                <img src="./images/icons/pencil.png" class="edit" alt="">
                <img src="./images/icons/close.png" class="delete" alt="">
            </div>
        </div>

        <p class="description">A tale of Lord ram's life</p>
        </div>
    `,
    `
        <div class="book">
        <h3>Iron man</h3>
        <div class="details flex">
            <p class="pages">500 pages</p>

            <div class="actions" data-value="1">
                <img src="./images/icons/pencil.png" class="edit" alt="">
                <img src="./images/icons/close.png" class="delete" alt="">
            </div>
        </div>

        <p class="description">A superhero story</p>
        </div>
    `
];

function BOOK(title, pages, description, readStatus, db) {
    this.title = title;
    this.pages = pages;
    this.description = description;
    this.readStatus = readStatus;
    this.db = db;
    this.addBook();
}

BOOK.prototype.addBook = function() {
    const {title, pages, description, readStatus, db} = this;

    const tag = `
    <div class="book">
        <h3>${title}</h3>
        <div class="details flex">
            <p class="pages">${pages} pages</p>

            <div class="actions" data-value="${db.length}">
                <img src="./images/icons/pencil.png" class="edit" alt="">
                <img src="./images/icons/close.png" class="delete" alt="">
            </div>
        </div>

        <p class="description">${description}</p>
    </div>
    `
    db.push(tag);
}

BOOK.prototype.render = function(parentElem) {
    const tags = this.db.map(item => item).join("");
    parentElem.innerHTML = tags;
}




// Actual implimentation
const form = document.querySelector("form.createNewbook");
const newBookCreateBtn = document.querySelector("#addNewBook");
const bookShelf = document.querySelector(".booklist");
// FORM CONTROLS

const formClose = form.querySelector("img.form-close");

// Buttons functions
newBookCreateBtn.addEventListener("click", () => {
    form.classList.toggle("display");
});

formClose.addEventListener("click", closeForm);
function closeForm() {
    form.classList.remove("display");
    form.reset();
}


// FORM HANDLING
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = form.querySelector("#btitle").value;
    const description = form.querySelector("#bdescription").value;
    const pages = form.querySelector("#pagesCount").value;
    const readStatus = form.querySelector("#readStatus").value;
    const saveBtn = form.querySelector("button");

    const newbook = new BOOK(title, pages, description, readStatus, LIBRARY);
    newbook.render(bookShelf);
    closeForm();
})

