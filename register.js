// =========================================
// Exglobe Registration
// =========================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyasM1tqW9SYmKXAQMPgQCq8qMjrrI-iB74oHJuDnvFJGrw1JPmv7aAgemf9XPjw5jj/exec";

const form = document.getElementById("registerForm");
const btn = document.getElementById("registerBtn");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const company = document.getElementById("company").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const country = document.getElementById("country").value;
    const address = document.getElementById("address").value.trim();

    // Validation

    if (
        fullName === "" ||
        mobile === "" ||
        whatsapp === "" ||
        email === "" ||
        password === ""
    ) {
        alert("Please fill all required fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Disable Button

    btn.disabled = true;
    btn.innerHTML = "Please Wait...";

    // Generate temporary values

    const customerId = "EX" + Date.now();

    const names = fullName.split(" ");

    let shippingMark = "EXG-";

    if (names.length >= 2) {

        shippingMark +=
            names[0].substring(0, 1).toUpperCase() +
            names[1].substring(0, 2).toUpperCase();

    } else {

        shippingMark +=
            fullName.substring(0, 3).toUpperCase();

    }

    const data = {

        customerId: customerId,

        shippingMark: shippingMark,

        fullName: fullName,

        company: company,

        mobile: mobile,

        whatsapp: whatsapp,

        email: email,

        password: password,

        country: country,

        address: address

    };

    fetch(SCRIPT_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    })

    .then(response => response.json())

    .then(result => {

        btn.disabled = false;
        btn.innerHTML = "Register Now";

        if (result.success || result.status === "success") {

            alert("Registration Successful!");

            form.reset();

        } else {

            alert("Registration Failed.");

            console.log(result);

        }

    })

    .catch(error => {

    btn.disabled = false;
    btn.innerHTML = "Register Now";

    console.error(error);

    alert(error.message);

});

});