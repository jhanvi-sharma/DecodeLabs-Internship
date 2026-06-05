const form = document.getElementById("registrationForm");
const themeBtn = document.getElementById("themeBtn");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const successMessage = document.getElementById("successMessage");
const strength = document.getElementById("strength");
const savedTheme = localStorage.getItem("theme");
if(savedTheme === "dark"){
    document.body.classList.add("dark-mode");
    themeBtn.textContent = "Light Mode";
}
themeBtn.addEventListener("click", function(){
        document.body.classList.toggle("dark-mode");
        if(document.body.classList.contains("dark-mode")){
            localStorage.setItem(
                "theme", "dark");
            themeBtn.textContent = "Light Mode";
        }
        else{
            localStorage.setItem(
                "theme", "light");
            themeBtn.textContent = "Dark Mode";
        }
    }
);
togglePassword.addEventListener("click",function(){
        if(passwordInput.type === "password"){
            passwordInput.type = "text";
            togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
        }
        else{
            passwordInput.type = "password";
            togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
        }
    }
);
passwordInput.addEventListener("input",function(){
        const password = passwordInput.value;
        if(password.length < 8){
            strength.textContent = "Weak Password";
            strength.style.color = "red";
        }
        else if(password.length < 12){
            strength.textContent = "Medium Password";
            strength.style.color = "orange";
        }
        else{
            strength.textContent = "Strong Password";
            strength.style.color = "green";
        }
    }
);
form.addEventListener("submit",function(event){
        event.preventDefault();
        document.querySelectorAll(".error").forEach(error => {
            error.textContent = "";
        });
        document.querySelectorAll("input, select").forEach(field => {field.classList.remove(
            "success-input", "error-input");
        });
        successMessage.textContent = "";
        let isValid = true;
        const name = document.getElementById("name").value.trim();
        const nameInput = document.getElementById("name");
        const email = document.getElementById("email").value.trim();
        const emailInput = document.getElementById("email");
        const phone = document.getElementById("phone").value.trim();
        const phoneInput = document.getElementById("phone");
        const age = document.getElementById("age").value.trim();
        const ageInput = document.getElementById("age");
        const gender = document.querySelector('input[name="gender"]:checked');
        const course = document.getElementById("course").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const nameRegex = /^[A-Za-z ]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;
        if(!nameRegex.test(name)){
            document.getElementById("nameError").textContent = "Enter valid name";
            nameInput.classList.add("error-input");
            isValid = false;
        }
        else{
            nameInput.classList.add("success-input");
        }
        if(!emailRegex.test(email)){
            document.getElementById("emailError").textContent = "Enter valid email";
            emailInput.classList.add("error-input");
            isValid = false;
        }
        else{
            emailInput.classList.add("success-input");
        }
        if(!phoneRegex.test(phone)){
            document.getElementById("phoneError").textContent = "Enter valid phone number";
            phoneInput.classList.add("error-input");
            isValid = false;
        }
        else{
            phoneInput.classList.add("success-input");
        }
        if(age < 16 || age > 30){
            document.getElementById("ageError").textContent = "Age must be between 16 and 30";
            ageInput.classList.add("error-input");
            isValid = false;
        }
        else{
            ageInput.classList.add("success-input");
        }
        if(!gender){
            document.getElementById("genderError").textContent = "Select gender";
            isValid = false;
        }
        if(course === ""){
            document.getElementById("courseError").textContent = "Select course";
            isValid = false;
        }
        if(!passwordRegex.test(password)){
            document.getElementById("passwordError").textContent = "Password must contain uppercase, lowercase, number and special character";
            passwordInput.classList.add("error-input");
            isValid = false;
        }
        else{
            passwordInput.classList.add("success-input");
        }
        if(password !== confirmPassword){
            document.getElementById("confirmPasswordError").textContent = "Passwords do not match";
            isValid = false;
        }
        if(isValid){
            successMessage.textContent = "Registration Successful!";
            setTimeout(function(){
                successMessage.textContent = "";
            },3000);
            form.reset();
            strength.textContent = "";
        }
    }
);