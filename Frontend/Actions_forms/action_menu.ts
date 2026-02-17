const btn_calendar = document.getElementById("btn_calendar") as HTMLButtonElement
const btn_user = document.getElementById("btn_user") as HTMLButtonElement
const btn_training = document.getElementById("btn_training") as HTMLButtonElement

btn_calendar.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.replace("../Body_forms/calendar_body.html")
})

btn_user.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.replace("../Body_forms/user_body.html")

})

btn_training.addEventListener("click", (e)=>{
    e.preventDefault();
    window.location.replace("../Body_forms/routine_body.html")
})