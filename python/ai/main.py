from fastapi import FastAPI
from ai.routers.movie_ai import router as movie_router

app = FastAPI()

app.include_router(movie_router, prefix="/movie")