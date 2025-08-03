from fastapi import FastAPI

from api.routers import task, done, auth

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(task.router)
app.include_router(done.router)
app.include_router(auth.router)


@app.get("/")
async def hello():
    return {"message": "hello world!"}


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
