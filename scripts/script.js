
// Actual implimentation
const form = document.querySelector("form.createNewbook");

const newBookCreateBtn = document.querySelector("#addNewBook");
const bookShelf = document.querySelector(".booklist");


// FORM CONTROLS
const titleInput = form.querySelector("#btitle");
const descriptionInput = form.querySelector("#bdescription");
const pagesInput = form.querySelector("#pagesCount");
const readStatusInput = form.querySelector("#readStatus");
const formClose = form.querySelector("img.form-close");



// this array will work as database
const LIBRARY = [
    {
        description: "THE BOOK OF AMAN",
        pages: "100",
        readStatus: "Not read yet!",
        title: "AMAN",
    },
    {
        description: "THE BOOK OF RITESH",
        pages: "200",
        readStatus: "Not read yet!",
        title: "RITESH",
    },
    {
        description: "THE BOOK OF SHASHI",
        pages: "400",
        readStatus: "Not read yet!",
        title: "SHASHI",
    },
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
    db.push({title, pages, description, readStatus});
}

function render(parentElem, arr) {
    const tags = arr.map(item => {
    const {title, pages, description, readStatus} = item;
    return `
        <div class="book">
            <h3>${title}</h3>
            <div class="details flex">
                <p class="pages">${pages} pages</p>

                <div class="actions" data-value="${arr.indexOf(item)}">
                    <img src="./images/icons/pencil.png" class="edit" alt="">
                    <img src="./images/icons/close.png" class="delete" alt="">
                </div>
            </div>

            <p class="description">${description}</p>
        </div>
    `}).join("");
    parentElem.innerHTML = tags;
    console.log();
    deleteBook( arr, parentElem);
    editBook(arr, parentElem);
}


function deleteBook(arr, parentElem) {
    const taglist = parentElem.querySelectorAll("img.delete");
    taglist.forEach(tag => {
        tag.addEventListener("click", (e) => {
            const idx = Number(e.target.parentElement.dataset.value);
            arr.splice(idx, 1);
            render(parentElem, arr);
        })
    })
}



function editBook(arr, parentElem) {
    const taglist = parentElem.querySelectorAll("img.edit");
    let obj = null;
    
    taglist.forEach(tag => {
        tag.addEventListener("click", (e) => {
            const idx = Number(e.target.parentElement.dataset.value);
            obj = arr[idx];
            form.classList.add("display");

            titleInput.value = obj.title;
            descriptionInput.value = obj.description;
            pagesInput.value = obj.pages;
            readStatusInput.value = obj.value;

            arr.splice(idx, 1);
        })
    })
}



// On Load 
window.addEventListener("load", () => {
    render(bookShelf, LIBRARY);
});


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

    const title = titleInput.value;
    const description = descriptionInput.value;
    const pages = pagesInput.value;
    const readStatus = readStatusInput.value;

    const newbook = new BOOK(title, pages, description, readStatus, LIBRARY);
    render(bookShelf, LIBRARY);

    closeForm();
})

