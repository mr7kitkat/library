const LIBRARY = [];

// function BOOK(title, description, pages, status) {
//     const obj = {};
//     this.title = title
//     this.description = description
//     this.pages = pages
//     this.status = status

//     return obj;
// }

function generateDom(arr) {
    return arr.map(item => `
        <div class="book">
                <h3>${item.title}</h3>
                <div class="details flex">
                    <p class="pages">${item.pages} pages</p>

                    <div class="actions">
                        <img src="./images/icons/pencil.png" alt="">
                        <img src="./images/icons/close.png" alt="">
                    </div>
                </div>

                <p class="description">${item.description}</p>
            </div>
        `).join("");
}


function renderArray(domobj, text) {
    domobj.innerHTML = text;
}

$(document).ready(function() {
    $(".newbookBtn").click(function() {
        $("main form").toggleClass("display");
    });

    $(".form-close").click(function() {
        $("main form").removeClass("display");
        $("form").trigger("reset");
    });

    $("form").on('submit', function(e){
        e.preventDefault();
        
        const obj = {};
        [...this.elements].forEach(element => {
            if(element.localName !== "button") {
                obj[element.name] = element.value;
            }
        });
        
        $(this).trigger("reset");
        obj.status = obj.status === "yes" ? true : false;

        LIBRARY.push(obj);
        
        const library = generateDom(LIBRARY);
        renderArray(document.querySelector(".booklist"),library);
    })
})

