const URL = import.meta.env.VITE_URL_DATA_USER

async function loadUserProfile() {
    try{
        const response = await fetch(URL,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (response.ok){
            const data = await response.json()

            const lbl_name = document.querySelector(".profile-name")
            const lbl_weight = document.querySelector(".stat-value")

            if (lbl_name !== null){
                lbl_name.textContent = data.names
            }else{
                alert(data.error || "Error")
                console.log("No se encontró con la etiqueta html")
            }

            if(lbl_weight !== null){
                lbl_weight.textContent = data.gender
            }else{
                alert(data.error || "Error")
                console.log("No se encontró con la etiqueta html")
            }
            
        }else{
            alert("Error al obtener los datos, vuelva a iniciar sesión")
            window.location.replace("../index.html");
        }

    } catch(error){
        console.log("Fallo gravisimo", error)
        alert("Error con la conexión al servidor")
    }
}

loadUserProfile()