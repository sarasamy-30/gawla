window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".sticky-on-scroll");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});   












// favorite
document.querySelectorAll(".fav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
  });
});

//pagination
const cards = document.querySelectorAll(".page-card");
const pagination = document.getElementById("pagination");

const cardsPerPage = 8;
let currentPage = 1;

function showPage(page) {
    currentPage = page;

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    cards.forEach((card, index) => {
        card.style.display =
            index >= start && index < end ? "block" : "none";
    });

    updateButtons();
}

function createPagination() {
    const pageCount = Math.ceil(cards.length / cardsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const li = document.createElement("li");

        li.innerHTML = `
            <button onclick="showPage(${i})">${i}</button>
        `;

        pagination.appendChild(li);
    }
}

function updateButtons() {
    const buttons = pagination.querySelectorAll("button");

    buttons.forEach((btn, index) => {
        btn.classList.toggle("active", index + 1 === currentPage);
    });
}

createPagination();
showPage(1);
