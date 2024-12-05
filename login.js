function loginUser() {
    const email = document.getElementById("logemail").value;
    const password = document.getElementById("logpass").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert("Login exitoso");
        localStorage.setItem("isLoggedIn", "true"); // Guardar el estado de login
        window.location.href = "index.html"; // Redirigir a la página principal
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}
function logout() {
    localStorage.removeItem("isLoggedIn");
    alert("Has cerrado sesión.");
    window.location.href = "login.html"; // Redirigir a login después de cerrar sesión
  }
  