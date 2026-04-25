    const up = document.querySelector("#up"); 

    up.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY >200) {
            up.classList.remove("d-none");
        } else {
            up.classList.add("d-none");
        }
    });
        window.addEventListener("scroll", function () {
        const nav = document.querySelector("nav"); 
        if (window.scrollY > 300) {
        nav.classList.add("sticky-on-scroll");
        } else {
        nav.classList.remove("sticky-on-scroll");
        }
        });

////////////////////////////////////////////////////////////////////







// document.addEventListener('DOMContentLoaded', () => {


//     // ===== Calendar =====
//     let currentDate = new Date();
//     let selectedDate = null;
//     let calMonth = currentDate.getMonth();
//     let calYear = currentDate.getFullYear();

//     const calMonthYear = document.getElementById('cal-month-year');
//     const calDays = document.getElementById('cal-days');
//     const calPrev = document.getElementById('cal-prev');
//     const calNext = document.getElementById('cal-next');

//     const monthNames = [
//         'January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'
//     ];

//     function renderCalendar() {
//         calDays.innerHTML = '';
//         calMonthYear.textContent = `${monthNames[calMonth]} ${calYear}`;

//         const firstDay = new Date(calYear, calMonth, 1).getDay();
//         const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
//         const today = new Date();

//         // Empty cells before first day
//         for (let i = 0; i < firstDay; i++) {
//             const empty = document.createElement('div');
//             empty.classList.add('cal-day', 'empty');
//             calDays.appendChild(empty);
//         }

//         // Days
//         for (let d = 1; d <= daysInMonth; d++) {
//             const dayEl = document.createElement('div');
//             dayEl.classList.add('cal-day');
//             dayEl.textContent = d;

//             const thisDate = new Date(calYear, calMonth, d);

//             // Check if past day
//             const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//             if (thisDate < todayStart) {
//                 dayEl.classList.add('disabled');
//             } else {
//                 // Check if today
//                 if (d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear()) {
//                     dayEl.classList.add('today');
//                 }

//                 // Check if selected
//                 if (selectedDate && d === selectedDate.getDate() && calMonth === selectedDate.getMonth() && calYear === selectedDate.getFullYear()) {
//                     dayEl.classList.add('selected');
//                 }

//                 dayEl.addEventListener('click', () => {
//                     selectedDate = new Date(calYear, calMonth, d);
//                     renderCalendar();
//                 });
//             }

//             calDays.appendChild(dayEl);
//         }
//     }

//     if (calPrev && calNext) {
//         calPrev.addEventListener('click', () => {
//             calMonth--;
//             if (calMonth < 0) {
//                 calMonth = 11;
//                 calYear--;
//             }
//             renderCalendar();
//         });

//         calNext.addEventListener('click', () => {
//             calMonth++;
//             if (calMonth > 11) {
//                 calMonth = 0;
//                 calYear++;
//             }
//             renderCalendar();
//         });

//         renderCalendar();
//     }

//     // ===== Ticket Counter & Pricing =====
// const visitorRadios = document.querySelectorAll('input[name="visitor"]');
// const ticketPrices = document.querySelectorAll('.ticket-price');

// function getVisitorType() {
//     const checked = document.querySelector('input[name="visitor"]:checked');
//     return checked ? checked.value : 'egyptian';
// }

// function updatePriceLabels() {
//     const type = getVisitorType();

//     ticketPrices.forEach(el => {

//         let price = 0;
//         let currency = "";

//         if (type === "egyptian") {
//             price = el.dataset.egy;
//             currency = "EGP";
//         } else {
//             price = el.dataset.for;
//             currency = "USD";
//         }

//         el.textContent = `${price} ${currency}`;
//     });

//     updateTotal();
// }

// /* change event */
// visitorRadios.forEach(radio => {
//     radio.addEventListener("change", updatePriceLabels);
// });

// /* first load */
// updatePriceLabels();



//     // ===== Total Calculation =====
//     function updateTotal() {
//         const type = getVisitorType();
//         const rows = document.querySelectorAll('.ticket-row');
//         let total = 0;
//         let breakdownHTML = '';
//         let hasTickets = false;

//         rows.forEach(row => {
//             const count = parseInt(row.querySelector('.counter-value').textContent);
//             const priceEl = row.querySelector('.ticket-price');
//             const label = row.querySelector('.ticket-label').textContent;
//             const price = parseInt(type === 'egyptian' ? priceEl.dataset.egy : priceEl.dataset.for);

//             if (count > 0) {
//                 hasTickets = true;
//                 const lineTotal = count * price;
//                 total += lineTotal;
//                 const visitorLabel = type === 'egyptian' ? 'Egyptian' : 'Foreigner';
//                 breakdownHTML += `<p>${count} Ticket${count > 1 ? 's' : ''} ${visitorLabel} (${label})  <strong>${lineTotal} EGP</strong></p>`;
//             }
//         });

//         const totalBreakdown = document.getElementById('total-breakdown');
//         const totalPrice = document.getElementById('total-price');

//         if (hasTickets) {
//             totalBreakdown.innerHTML = breakdownHTML;
//         } else {
//             totalBreakdown.innerHTML = '<p class="total-empty">No tickets selected</p>';
//         }

//         totalPrice.textContent = `$${total.toFixed(2)}`;
//     }

//     // ===== Book Now =====
//     const bookNowBtn = document.getElementById('book-now-btn');
//     if (bookNowBtn) {
//         bookNowBtn.addEventListener('click', () => {
//             const total = document.getElementById('total-price').textContent;
//             if (total === '$0.00' || total === '$0') {
//                 alert('Please select at least one ticket!');
//                 return;
//             }
//             if (!selectedDate) {
//                 alert('Please select a date!');
//                 return;
//             }
//             const dateStr = selectedDate.toLocaleDateString('en-US', {
//                 weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
//             });
//             alert(`Booking confirmed!\n\nDate: ${dateStr}\nTotal: ${total}\n\nThank you for booking with Cairo Tourism!`);
//         });
//     }
// });

// // ===== Gallery Image Changer =====
// function changeMainImage(thumbEl) {
//     const mainImg = document.getElementById('gallery-main-img');
//     const thumbImg = thumbEl.querySelector('img');
//     mainImg.src = thumbImg.src;
//     mainImg.alt = thumbImg.alt;

//     // Update active state
//     document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
//     thumbEl.classList.add('active');
// }

// // ===== Ticket Counter =====
// function updateCounter(btn, change) {
//     const counterValue = btn.parentElement.querySelector('.counter-value');
//     let value = parseInt(counterValue.textContent);
//     value = Math.max(0, value + change);
//     counterValue.textContent = value;

//     // Animate
//     counterValue.style.transform = 'scale(1.3)';
//     setTimeout(() => {
//         counterValue.style.transform = 'scale(1)';
//     }, 150);

//     // Update total
//     const type = document.querySelector('input[name="visitor"]:checked').value;
//     const rows = document.querySelectorAll('.ticket-row');
//     let total = 0;
//     let breakdownHTML = '';
//     let hasTickets = false;

//     rows.forEach(row => {
//         const count = parseInt(row.querySelector('.counter-value').textContent);
//         const priceEl = row.querySelector('.ticket-price');
//         const label = row.querySelector('.ticket-label').textContent;
//         const price = parseFloat(type === 'egyptian' ? priceEl.dataset.egy : priceEl.dataset.for);

//         if (count > 0) {
//             hasTickets = true;
//             const lineTotal = count * price;
//             total += lineTotal;
//             const visitorLabel = type === 'egyptian' ? 'Egyptian' : 'Foreigner';
//             breakdownHTML += `<p>${count} Ticket${count > 1 ? 's' : ''} ${visitorLabel} (${label})  <strong>$${lineTotal.toFixed(2)}</strong></p>`;
//         }
//     });

//     const totalBreakdown = document.getElementById('total-breakdown');
//     const totalPrice = document.getElementById('total-price');

//     if (hasTickets) {
//         totalBreakdown.innerHTML = breakdownHTML;
//     } else {
//         totalBreakdown.innerHTML = '<p class="total-empty">No tickets selected</p>';
//     }

//     totalPrice.textContent = `$${total.toFixed(2)}`;
// }


document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CALENDAR
    ========================= */
    let currentDate = new Date();
    let selectedDate = null;
    let calMonth = currentDate.getMonth();
    let calYear = currentDate.getFullYear();

    const calMonthYear = document.getElementById("cal-month-year");
    const calDays = document.getElementById("cal-days");
    const calPrev = document.getElementById("cal-prev");
    const calNext = document.getElementById("cal-next");

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    function renderCalendar() {

        if (!calDays) return;

        calDays.innerHTML = "";
        calMonthYear.textContent =
            `${monthNames[calMonth]} ${calYear}`;

        const firstDay =
            new Date(calYear, calMonth, 1).getDay();

        const daysInMonth =
            new Date(calYear, calMonth + 1, 0).getDate();

        const today = new Date();

        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement("div");
            empty.classList.add("cal-day", "empty");
            calDays.appendChild(empty);
        }

        for (let d = 1; d <= daysInMonth; d++) {

            const dayEl = document.createElement("div");
            dayEl.classList.add("cal-day");
            dayEl.textContent = d;

            const thisDate =
                new Date(calYear, calMonth, d);

            const todayStart =
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                );

            if (thisDate < todayStart) {

                dayEl.classList.add("disabled");

            } else {

                if (
                    d === today.getDate() &&
                    calMonth === today.getMonth() &&
                    calYear === today.getFullYear()
                ) {
                    dayEl.classList.add("today");
                }

                if (
                    selectedDate &&
                    d === selectedDate.getDate() &&
                    calMonth === selectedDate.getMonth() &&
                    calYear === selectedDate.getFullYear()
                ) {
                    dayEl.classList.add("selected");
                }

                dayEl.addEventListener("click", () => {
                    selectedDate =
                        new Date(calYear, calMonth, d);

                    renderCalendar();
                });
            }

            calDays.appendChild(dayEl);
        }
    }

    if (calPrev && calNext) {

        calPrev.addEventListener("click", () => {
            calMonth--;

            if (calMonth < 0) {
                calMonth = 11;
                calYear--;
            }

            renderCalendar();
        });

        calNext.addEventListener("click", () => {
            calMonth++;

            if (calMonth > 11) {
                calMonth = 0;
                calYear++;
            }

            renderCalendar();
        });

        renderCalendar();
    }

    /* =========================
       PAGE TYPES
    ========================= */
    const isTicketPage =
        document.querySelector(".ticket-page");

    const isPackagePage =
        document.querySelector(".package-page");

    const isEventPage =
        document.querySelector(".event-page");

    const totalBreakdown =
        document.getElementById("total-breakdown");

    const totalPrice =
        document.getElementById("total-price");

    const visitorRadios =
        document.querySelectorAll('input[name="visitor"]');

    const timeRadios =
        document.querySelectorAll('input[name="time-slot"]');

    function getVisitorType() {

        const checked =
            document.querySelector(
                'input[name="visitor"]:checked'
            );

        return checked
            ? checked.value
            : "egyptian";
    }

    /* =========================
       UPDATE PRICE LABELS
    ========================= */
    function updatePriceLabels() {

        const type = getVisitorType();

        const prices =
            document.querySelectorAll(".ticket-price");

        prices.forEach(el => {

            const price =
                type === "egyptian"
                    ? el.dataset.egy
                    : el.dataset.for;

            const currency =
                type === "egyptian"
                    ? "EGP"
                    : "USD";

            el.textContent =
                `${price} ${currency}`;
        });

        updateTotal();
    }

    visitorRadios.forEach(radio => {
        radio.addEventListener(
            "change",
            updatePriceLabels
        );
    });

    timeRadios.forEach(radio => {
        radio.addEventListener(
            "change",
            updateTotal
        );
    });

    /* =========================
       TOTAL
    ========================= */
    function updateTotal() {

        const type = getVisitorType();

        let total = 0;

        let currency =
            type === "egyptian"
                ? "EGP"
                : "USD";

        const rows =
            document.querySelectorAll(".ticket-row");

        let adult = 0;
        let child = 0;
        let student = 0;

        rows.forEach(row => {

            const count = parseInt(
                row.querySelector(".counter-value")
                    .textContent
            );

            const label =
                row.querySelector(".ticket-label")
                    .textContent;

            const priceEl =
                row.querySelector(".ticket-price");

            const price = parseFloat(
                type === "egyptian"
                    ? priceEl.dataset.egy
                    : priceEl.dataset.for
            );

            total += count * price;

            if (label.includes("Adult")) adult = count;
            if (label.includes("Child")) child = count;
            if (label.includes("Student")) student = count;
        });

        const totalCount =
            adult + child + student;

        /* =====================
           TICKET PAGE
        ===================== */
        if (isTicketPage) {

            if (totalCount > 0) {

                totalBreakdown.innerHTML = `
                <p>${totalCount} Tickets</p>
                <p>${adult} Adult</p>
                <p>${child} Children</p>
                <p>${student} Student</p>
                <p>Earned Points: --</p>
                `;

            } else {

                totalBreakdown.innerHTML =
                    `<p>No tickets selected</p>`;
            }
        }
        // ////////////////////////////////////////////////
        /* =====================
   PACKAGE PAGE
===================== */
        else if (isPackagePage) {

            if (totalCount > 0) {

                totalBreakdown.innerHTML = `

        <div class="d-flex justify-content-between mb-2">
            <span>${totalCount} Packages</span>
            <strong>${total} ${currency}</strong>
        </div>

        <div class="d-flex justify-content-between mb-2">
            <span>${adult} Adult</span>
            <strong></strong>
        </div>

        <div class="d-flex justify-content-between mb-2">
            <span>${child} Children</span>
            <strong></strong>
        </div>

        <div class="d-flex justify-content-between mb-2">
            <span>${student} Student</span>
            <strong></strong>
        </div>

        <div class="d-flex justify-content-between mb-2">
            <span>Earned Points:</span>
            <strong>--</strong>
        </div>

        `;

            } else {

                totalBreakdown.innerHTML = `
        <p>No packages selected</p>
        `;
            }
        }








        /* =====================
           EVENT PAGE
        ===================== */
        else if (isEventPage) {

            const selectedTime =
                document.querySelector(
                    'input[name="time-slot"]:checked'
                );

            const timeValue =
                selectedTime
                    ? selectedTime.value
                    : "No Time Selected";

            if (type === "egyptian") {
                total = 150;
                currency = "EGP";
            } else {
                total = 30;
                currency = "USD";
            }

            totalBreakdown.innerHTML = `
    <div class="d-flex justify-content-between mb-2">
        <span>1 Ticket</span>
        <strong>${total} ${currency}</strong>
    </div>

    <div class="d-flex justify-content-between mb-2">
        <span>Selected Time:</span>
        <strong>${timeValue}</strong>
    </div>

    <div class="d-flex justify-content-between mb-2">
        <span>Earned Points:</span>
        <strong>--</strong>
    </div>
    `;
        }

        totalPrice.textContent =
            `${total} ${currency}`;
    }

    /* =========================
       COUNTER
    ========================= */
    window.updateCounter =
        function (btn, change) {

            const counter =
                btn.parentElement.querySelector(
                    ".counter-value"
                );

            let value =
                parseInt(counter.textContent);

            value =
                Math.max(0, value + change);

            counter.textContent = value;

            updateTotal();
        };

    /* =========================
       BOOK NOW
    ========================= */
    const bookNowBtn =
        document.getElementById("book-now-btn");

    if (bookNowBtn) {

        bookNowBtn.addEventListener("click", () => {

            const type =
                getVisitorType() === "egyptian"
                    ? "Egyptian"
                    : "Foreigner";

            const total =
                totalPrice.textContent;

            /* لازم يختار حاجة */
            if (
                total === "0 EGP" ||
                total === "0 USD"
            ) {
                alert("Please select item first!");
                return;
            }

            /* لازم يختار تاريخ */
            if (!selectedDate) {
                alert("Please select date from calendar!");
                return;
            }

            const dateStr =
                selectedDate.toLocaleDateString(
                    "en-US",
                    {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }
                );

            let details = "";


            /* =====================
               TICKET PAGE
            ===================== */
            if (isTicketPage || isPackagePage) {

                const rows =
                    document.querySelectorAll(".ticket-row");

                let adult = 0;
                let child = 0;
                let student = 0;

                rows.forEach(row => {

                    const count = parseInt(
                        row.querySelector(".counter-value")
                            .textContent
                    );

                    const label =
                        row.querySelector(".ticket-label")
                            .textContent;

                    if (label.includes("Adult")) {
                        adult = count;
                    }

                    if (label.includes("Child")) {
                        child = count;
                    }

                    if (label.includes("Student")) {
                        student = count;
                    }
                });

                details =
                    `Visitor Type: ${type}
Adult: ${adult}
Children: ${child}
Student: ${student}`;
            }
        

            /* =====================
               EVENT PAGE
            ===================== */
            else if (isEventPage) {

                const selectedTime =
                    document.querySelector(
                        'input[name="time-slot"]:checked'
                    );

                const timeValue =
                    selectedTime
                        ? selectedTime.value
                        : "No Time Selected";

                details =
                    `Visitor Type: ${type}
Time: ${timeValue}`;
            }

            alert(`Booking Confirmed!

${details}

Date: ${dateStr}
Total: ${total}

Thank you for choosing Gawla ✨`);
        });
    }

    /* =========================
       GALLERY
    ========================= */
    function changeMainImage(thumbEl) {

        const mainImg =
            document.getElementById(
                "gallery-main-img"
            );

        const thumbImg =
            thumbEl.querySelector("img");

        mainImg.src = thumbImg.src;
        mainImg.alt = thumbImg.alt;

        document.querySelectorAll(".thumb")
            .forEach(t =>
                t.classList.remove("active")
            );

        thumbEl.classList.add("active");
    }
});