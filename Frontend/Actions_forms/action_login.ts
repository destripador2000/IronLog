const txt_username = document.getElementById("txt_username") as HTMLInputElement;
const txt_password = document.getElementById("txt_password") as HTMLInputElement;
const btn_login = document.getElementById("btn_login") as HTMLButtonElement;
const URL = import.meta.env.VITE_URL_LOGIN_USER;

interface UserData {
    username: string;
    password: string;
}

btn_login.addEventListener('click', async (e) => {
    e.preventDefault();
    const UserJson: UserData = {
        username: txt_username.value.trim(),
        password: txt_password.value.trim()
    }; 
    try {
        
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(UserJson),
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            alert("Inicio de sesión exitoso.");
            window.location.replace("./Body_forms/menu_body.html")
        } else {
            alert(data.error || "Error en el inicio de sesión");
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error de conexión con el servidor");
    }
});