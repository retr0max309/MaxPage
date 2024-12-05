function registerUser() {
    // Obtener los valores de los campos
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return; // Detener la ejecución si no coinciden
    }

    // Crear un objeto de usuario
    const user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    };

    // Guardar el objeto en el localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Informar al usuario
    alert('Registro exitoso');

    // Redirigir a la página de login
    window.location.href = 'login.html';
}
