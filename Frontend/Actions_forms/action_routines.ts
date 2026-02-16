const btn_new_routine = document.getElementById("btn_new_routine") as HTMLButtonElement;
const div = document.getElementById("modal_overlay") as HTMLDivElement;
const btnCloseModal = document.getElementById('btn_close_modal') as HTMLButtonElement;
const btnCancelModal = document.getElementById('btn_cancel_modal') as HTMLButtonElement;
const btn_save_routine = document.getElementById("btn_save_routine") as HTMLButtonElement;
const input_routine_name = document.getElementById("inp_routine_name") as HTMLInputElement;
const cb_day_routine = document.getElementById("slc_routine_day") as HTMLSelectElement;
const input_exercise_name = document.getElementById("inp_ex_name") as HTMLInputElement;
const input_series = document.getElementById("inp_ex_series") as HTMLInputElement;
const input_reps = document.getElementById("inp_ex_reps") as HTMLInputElement; 
const btnAddExercise = document.getElementById('btn_add_exercise') as HTMLButtonElement;
const listContainer = document.getElementById('exercises_list_container') as HTMLDivElement;

const url = import.meta.env.VITE_URL_NEW_ROUTINE;
const url_get = import.meta.env.VITE_URL_GET_ROUTINE;

interface ExerciseData{
    name_exercise: string;
    series: number;
    reps: number;
}

interface RoutineData{
    id_routine: number;
    name_routine: string;
    day_routine: string;
}

let tempExercises: ExerciseData[] = [];

function toggleModal(show: boolean) {
    if (show) {
        div?.classList.remove('hidden');
    } else {
        div?.classList.add('hidden');
        clearForm()
    }
}
btn_new_routine.addEventListener('click', () => toggleModal(true));
btnCloseModal.addEventListener('click', () => toggleModal(false));
btnCancelModal.addEventListener('click', () => toggleModal(false));

function removeExercise(index: number) {
    tempExercises.splice(index, 1); // Lo borra del array
    renderExercisesList(); // Vuelve a pintar la lista
}

function clearForm() {
    input_routine_name.value = '';
    cb_day_routine.value = 'Lunes';
    tempExercises = []; // Vaciamos el array
    renderExercisesList(); // Limpiamos la vista
}
function renderExercisesList() {
    listContainer.innerHTML = ''; // Borramos lo que había para repintar

    tempExercises.forEach((ex, index) => {
        // Creamos el HTML de cada item
        const itemDiv = document.createElement('div');
        itemDiv.className = 'exercise-item';
        itemDiv.innerHTML = `
            <span><strong>${ex.name_exercise}</strong> - ${ex.series} series x ${ex.reps} reps</span>
            <button class="btn-delete-ex" onclick="removeExercise(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        // Agregamos evento al botón de borrar de este item
        const btnDel = itemDiv.querySelector('.btn-delete-ex') as HTMLButtonElement;
        btnDel.addEventListener('click', () => removeExercise(index));

        listContainer.appendChild(itemDiv);
    });
}

btnAddExercise.addEventListener('click', (e)=>{
    e.preventDefault()
    if (!input_exercise_name.value || !input_series.value || !input_reps.value) {
        alert("Por favor completa los datos del ejercicio");
        return;
    }

    const new_Exercise: ExerciseData = {
        name_exercise: input_exercise_name.value,
        series: parseInt(input_series.value),
        reps: parseInt(input_series.value)
    };
    
    tempExercises.push(new_Exercise)

    renderExercisesList();
    input_routine_name.value = "";
    cb_day_routine.value = "";
    input_exercise_name.value = "";
    input_series.value = "";
    input_reps.value = "";
    input_routine_name.focus()
    
})

btn_save_routine.addEventListener("click", async(e) =>{
    e.preventDefault()

    if (!input_routine_name.value) {
        alert("Por favor tu rutina necesita un nombre");
        return;
    }
    if(tempExercises.length === 0){
        alert("Por favor necesitas al menos un ejercicio");
        return;
    }

    const RoutineJson = {
        name_routine: input_routine_name.value,
        day_routine: cb_day_routine.value,
        exercises: tempExercises
    }

    try{
        const response = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(RoutineJson),
        });

        const data = await response.json();

        if (response.ok){
            alert("Se ha guardado exitosamente");
            input_routine_name.value = "";
            cb_day_routine.value = "";
            input_exercise_name.value = "";
            input_series.value = "";
            input_reps.value = "";
        }else{
            alert(data.error || "Error al guardar, intentelo más tarde");
            console.log(data.error)
        }
    }catch(error){
        console.error("Error al registrarse", error);
        alert("Error de conexión con el servidor, comuniquese con el CEO");
    }
});

window.addEventListener("load", async(e) =>{
    e.preventDefault()
    try{
        const response = await fetch(url_get,{
            method:"GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (response.ok){
            const data = await response.json() as RoutineData[]
            
            data.forEach((rou) =>{

                const itemDiv = document.createElement('div');
                itemDiv.className= 'routine-card';
                itemDiv.innerHTML=`
                <div class="card-icon">
                    <i class="fas fa-dumbbell"></i>
                </div>
                <div class="card-info">
                    <h3>${rou.day_routine}: ${rou.name_routine}</h3>
                </div>
                <button class="edit-btn"><i class="fas fa-pencil-alt"></i></button>
            `
                const father = document.querySelector(".routines-grid") as HTMLDivElement
                father.appendChild(itemDiv)

            })
        }else{
            alert("Error al obtener los datos")
        }
    }catch(error){
        console.log("Anda algo mal", error)
        alert("Error de conexión con el servidor")
    }
})











/*
<div class="routines-grid" id="routines_container">
            
            <div class="routine-card">
                <div class="card-icon">
                    <i class="fas fa-dumbbell"></i>
                </div>
                <div class="card-info">
                    <h3>LUNES: Pecho & Tríceps</h3>
                    <p>8 ejercicios</p>
                </div>
                <button class="edit-btn"><i class="fas fa-pencil-alt"></i></button>
            </div>

            <div class="routine-card">
                <div class="card-icon">
                    <i class="fas fa-running"></i>
                </div>
                <div class="card-info">
                    <h3>MIÉRCOLES: Pierna</h3>
                    <p>6 ejercicios</p>
                </div>
                <button class="edit-btn"><i class="fas fa-pencil-alt"></i></button>
            </div>
            </div>

*/ 