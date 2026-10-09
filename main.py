"""FastAPI application for the small HTML demo project."""

from pathlib import Path
from fastapi import Body, FastAPI, Query
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles


BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app = FastAPI(title="FastAPI H5 Demo", version="1.0.0")

# Static assets are available at /static/...
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


@app.get("/", include_in_schema=False)
async def read_homepage() -> FileResponse:
    """Return the native HTML home page."""

    return FileResponse(STATIC_DIR / "index.html")


@app.get("/api/hello")
async def hello(name: str = Query(..., min_length=1, description="要问候的姓名")) -> dict[str, str]:
    """Return a greeting for the supplied name."""

    return {"message": f"Hello, {name}!", "name": name}


@app.post("/api/submit")
async def submit(data: str = Body(..., description="前端提交的 JSON 字符串")) -> dict[str, str]:
    """Echo the JSON string received from the frontend."""

    return {"received": data}
