function validateForm() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let age = parseInt(document.getElementById("age").value);
    let password = document.getElementById("password").value;

    let valid = true;

    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("ageError").innerText = "";
    document.getElementById("passwordError").innerText = "";
    document.getElementById("successMessage").innerText = "";

    if (name === "") {
        document.getElementById("nameError").innerText = "Name cannot be empty.";
        valid = false;
    }

    if (!email.includes("@")) {
        document.getElementById("emailError").innerText = "Email must contain @.";
        valid = false;
    }

    if (isNaN(age) || age < 18 || age > 60) {
        document.getElementById("ageError").innerText = "Age must be between 18 and 60.";
        valid = false;
    }

    if (password.length < 6) {
        document.getElementById("passwordError").innerText = "Password must be at least 6 characters.";
        valid = false;
    }

    if (valid) {
        let confirmSubmit = confirm("Do you want to submit the form?");
        if (confirmSubmit) {
            document.getElementById("successMessage").innerText = "Registration Successful!";
            alert("Thank you for registering.");
        }
    }
}
