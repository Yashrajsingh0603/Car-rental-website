/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const nav = document.querySelector(".navbar nav");

    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "75px";
        nav.style.right = "5%";
        nav.style.background = "#151515";
        nav.style.padding = "20px";
        nav.style.borderRadius = "10px";
    }
}


/* =========================
   SCROLL TO CARS
========================= */

function scrollToCars() {

    document.getElementById("cars").scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================
   FILTER CARS
========================= */

function filterCars(category, button) {

    const cars = document.querySelectorAll(".car-card");
    const filters = document.querySelectorAll(".filter");

    filters.forEach(filter => {
        filter.classList.remove("active");
    });

    button.classList.add("active");

    cars.forEach(car => {

        if (
            category === "all" ||
            car.dataset.category === category
        ) {

            car.style.display = "block";

        } else {

            car.style.display = "none";

        }

    });

}


/* =========================
   SEARCH CARS
========================= */

function searchCars() {

    const pickup = document.getElementById("pickup").value;
    const returnLocation =
        document.getElementById("returnLocation").value;

    const pickupDate =
        document.getElementById("pickupDate").value;

    const returnDate =
        document.getElementById("returnDate").value;


    if (
        pickup === "" ||
        returnLocation === "" ||
        pickupDate === "" ||
        returnDate === ""
    ) {

        alert("Please enter all rental details.");

        return;
    }


    if (new Date(returnDate) < new Date(pickupDate)) {

        alert("Return date cannot be before pickup date.");

        return;
    }


    alert(
        "Great! Cars are available for your selected dates."
    );

    scrollToCars();

}


/* =========================
   BOOKING VARIABLES
========================= */

let selectedCarPrice = 0;
let selectedCarName = "";


/* =========================
   OPEN BOOKING
========================= */

function openBooking(carName, price) {

    selectedCarName = carName;
    selectedCarPrice = price;

    document.getElementById("selectedCar").innerText =
        carName;

    document.getElementById("rentalDays").value = 1;

    calculateTotal();

    document
        .getElementById("bookingModal")
        .classList.add("show");

}


/* =========================
   CLOSE BOOKING
========================= */

function closeBooking() {

    document
        .getElementById("bookingModal")
        .classList.remove("show");

}


/* =========================
   CALCULATE TOTAL
========================= */

function calculateTotal() {

    let days =
        Number(document.getElementById("rentalDays").value);

    if (days < 1 || isNaN(days)) {
        days = 1;
    }

    const total = selectedCarPrice * days;

    document.getElementById("totalPrice").innerText =
        "₹" + total.toLocaleString("en-IN");

}


/* =========================
   CONFIRM BOOKING
========================= */

function confirmBooking() {

    const name =
        document.getElementById("customerName").value;

    const email =
        document.getElementById("customerEmail").value;

    const phone =
        document.getElementById("customerPhone").value;

    const days =
        document.getElementById("rentalDays").value;


    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        days === ""
    ) {

        alert("Please fill all booking details.");

        return;
    }


    alert(
        "Booking request submitted successfully!\n\n" +
        "Car: " + selectedCarName +
        "\nCustomer: " + name +
        "\nRental Days: " + days
    );


    closeBooking();

}


/* =========================
   FAQ
========================= */

function toggleFAQ(button) {

    const item = button.parentElement;

    item.classList.toggle("open");

}


/* =========================
   ABOUT MESSAGE
========================= */

function showAbout() {

    document.getElementById("about").scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================
   CLOSE MODAL OUTSIDE CLICK
========================= */

document
    .getElementById("bookingModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeBooking();
        }

    });

    // ==========================================
// DRIVEX BOOKING SYSTEM
// ==========================================

let selectedCarName = "";
let selectedCarPrice = 0;

// Open booking modal
function openBooking(carName, price) {

    selectedCarName = carName;
    selectedCarPrice = Number(price);

    const modal = document.getElementById("bookingModal");
    const selectedCar = document.getElementById("selectedCar");

    if (selectedCar) {
        selectedCar.textContent = carName;
    }

    if (modal) {
        modal.classList.add("active");
    }

    calculateTotal();
}


// Close booking modal
function closeBooking() {

    const modal = document.getElementById("bookingModal");

    if (modal) {
        modal.classList.remove("active");
    }
}


// Calculate rental price
function calculateTotal() {

    const daysInput = document.getElementById("rentalDays");

    if (!daysInput) return;

    let days = Number(daysInput.value);

    if (days < 1 || isNaN(days)) {
        days = 1;
        daysInput.value = 1;
    }

    const total = selectedCarPrice * days;

    const totalPrice = document.getElementById("totalPrice");

    if (totalPrice) {
        totalPrice.textContent =
            "₹" + total.toLocaleString("en-IN");
    }
}


// Confirm booking
function confirmBooking() {

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const days = document.getElementById("rentalDays").value;

    if (!name || !email || !phone) {

        alert("Please fill all customer details.");

        return;
    }

    const bookingId =
        "DX" + Math.floor(100000 + Math.random() * 900000);

    const total =
        selectedCarPrice * Number(days);

    alert(
        "Booking Confirmed! 🎉\n\n" +
        "Booking ID: " + bookingId + "\n" +
        "Customer: " + name + "\n" +
        "Car: " + selectedCarName + "\n" +
        "Rental Days: " + days + "\n" +
        "Total Amount: ₹" +
        total.toLocaleString("en-IN")
    );

    closeBooking();

    // Clear form
    document.getElementById("customerName").value = "";
    document.getElementById("customerEmail").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("rentalDays").value = 1;
}


// Close modal when clicking outside
window.addEventListener("click", function(event) {

    const modal = document.getElementById("bookingModal");

    if (event.target === modal) {
        closeBooking();
    }

});

function calculateRentalDays() {

    const pickup =
        document.getElementById("pickupDate").value;

    const returnDate =
        document.getElementById("returnDate").value;

    if (!pickup || !returnDate) {
        return;
    }

    const pickupTime =
        new Date(pickup).getTime();

    const returnTime =
        new Date(returnDate).getTime();

    const difference =
        returnTime - pickupTime;

    const days =
        Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (days < 1) {

        alert("Return date must be after pickup date.");

        document.getElementById("returnDate").value = "";

        document.getElementById("rentalDays").value = 1;

        calculateTotal();

        return;
    }

    document.getElementById("rentalDays").value = days;

    calculateTotal();
}