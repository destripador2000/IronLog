const paso1 = document.getElementById('paso-1') as HTMLDivElement;
const paso2 = document.getElementById('paso-2') as HTMLDivElement;

const btnSiguiente = document.getElementById('btn-siguiente') as HTMLButtonElement;
const btnAtras = document.getElementById('btn-atras') as HTMLButtonElement;
const form = document.getElementById('registroForm') as HTMLFormElement;
const btnAdd= document.getElementById('btn_final_registro') as HTMLButtonElement;

const progressFill = document.getElementById('progress-fill') as HTMLDivElement;
const progressText = document.getElementById('progress-text') as HTMLParagraphElement;

const txt_username = document.getElementById('usuario') as HTMLInputElement;
const txt_email = document.getElementById('correo') as HTMLInputElement;
const txt_password = document.getElementById('password') as HTMLInputElement;
const txt_names = document.getElementById('nombres') as HTMLInputElement;
const txt_last_names = document.getElementById('apellidos') as HTMLInputElement;
const txt_phone = document.getElementById('telefono') as HTMLInputElement;
const txt_age = document.getElementById('edad') as HTMLInputElement;
const txt_birth_date = document.getElementById('fechaNacimiento') as HTMLInputElement;
const txt_cdi = document.getElementById('cedula') as HTMLInputElement;
const select_gender = document.getElementById('sexo') as HTMLSelectElement;


interface User{
    names: string;
    last_names: string;
    phone: string;
    age: number;
    birth_date: string;
    cdi: string
    gender: string;
    email: string;
    username: string;
    password: string;
}



// 2. Función para validar campos simples (para que no avancen vacío)
const validarCampos = (contenedor: HTMLDivElement): boolean => {
    const inputs = contenedor.querySelectorAll('input');
    let esValido = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            esValido = false;
            // Efecto visual simple de error (borde rojo momentáneo)
            input.style.borderColor = 'red';
            setTimeout(() => input.style.borderColor = '', 2000);
        }
    });

    return esValido;
};

// 3. Evento: Botón Siguiente
btnSiguiente.addEventListener('click', () => {
    // Validamos que el paso 1 tenga datos
    if (validarCampos(paso1)) {
        
        // Ocultar Paso 1
        paso1.classList.remove('active');
        paso1.classList.add('hidden');

        // Mostrar Paso 2
        paso2.classList.remove('hidden');
        paso2.classList.add('active');

        // Actualizar Barra de Progreso
        progressFill.style.width = '100%';
        progressText.innerText = 'Paso 2 de 2';
    } else {
        alert("Por favor completa los campos obligatorios.");
    }
});

// 4. Evento: Botón Atrás
btnAtras.addEventListener('click', () => {
    // Ocultar Paso 2
    paso2.classList.remove('active');
    paso2.classList.add('hidden');

    // Mostrar Paso 1
    paso1.classList.remove('hidden');
    paso1.classList.add('active');

    // Regresar Barra de Progreso
    progressFill.style.width = '50%';
    progressText.innerText = 'Paso 1 de 2';
});

form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    
    if (validarCampos(paso2)) {

    const add_user: User = {
        username: txt_username.value,
        password: txt_password.value,
        email: txt_email.value,
        names: txt_names.value,
        last_names: txt_last_names.value,
        phone: txt_phone.value,
        age: parseInt(txt_age.value),
        birth_date: txt_birth_date.value,
        cdi: txt_cdi.value,
        gender: select_gender.value
        };
        btnAdd.disabled = true;
        fetch("http://127.0.0.1:8000/users/",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(add_user)
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Error en la solicitud");
            }
            return response.json();
        })
        .then(data => {           
            console.log("Usuario registrado:", data);
            alert("Usuario registrado con éxito.");
            window.location.replace("../index.html");
        })
        .catch(error => {
            console.error("Error al registrar usuario:", error);
            alert("Error al registrar usuario.");
        })
        .finally(() => {
            btnAdd.disabled = false;
        });             
        
    } else {
        alert("Por favor completa los campos obligatorios.");
    }
    
});
