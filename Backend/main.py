from fastapi import FastAPI


app = FastAPI()

@app.get("/")
def home():
    return {"mensaje": "¡Hola, mi Backend está vivo!", "estado": "ok"}