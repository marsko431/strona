// Lista użytkowników
const users = [
    { username: "admin", password: "dupa12345" },
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" }
   
];

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Sprawdzanie, czy login i hasło pasują do któregoś użytkownika
    const validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {
        window.location.href = "main.html"; 
        alert("Witaj")
    } else {
        document.getElementById("error").textContent = "Błędny login lub hasło!";
    }
    

});
