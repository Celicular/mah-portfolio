import json
import os
import re
import uuid
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "changeme123")
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

app = FastAPI(title="Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Utilities ────────────────────────────────────────────────────────────────

def parse_image_url(url: str) -> str:
    """Convert Google Drive viewer links to direct-embed image URLs."""
    if not url:
        return url
    # Match: https://drive.google.com/file/d/FILE_ID/view?...
    match = re.match(r"https://drive\.google\.com/file/d/([^/]+)/.*", url)
    if match:
        file_id = match.group(1)
        return f"https://drive.google.com/uc?export=view&id={file_id}"
    return url


def check_auth(x_admin_password: Optional[str]):
    if x_admin_password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Unauthorized: invalid password.")


def load_data(filename: str) -> list:
    path = os.path.join(DATA_DIR, filename)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_data(filename: str, data: list):
    path = os.path.join(DATA_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ─── Models ───────────────────────────────────────────────────────────────────

class PortfolioItem(BaseModel):
    title: str
    category: str
    image: str
    desc: str
    link: str
    order: Optional[int] = 0
    hidden: Optional[bool] = False
    under_development: Optional[bool] = False


class ProjectItem(BaseModel):
    title: str
    type: str
    tech: List[str]
    image: str
    desc: str
    link: str
    order: Optional[int] = 0
    hidden: Optional[bool] = False
    under_development: Optional[bool] = False


class ReorderRequest(BaseModel):
    ids: List[str]


# ─── Portfolio Routes ──────────────────────────────────────────────────────────

@app.get("/api/portfolio", summary="Get visible portfolio items (public)")
def get_portfolio():
    items = load_data("portfolio.json")
    visible = [i for i in items if not i.get("hidden", False)]
    return sorted(visible, key=lambda x: x.get("order", 0))


@app.get("/api/portfolio/all", summary="Get all portfolio items (admin)")
def get_portfolio_all(x_admin_password: Optional[str] = Header(None)):
    check_auth(x_admin_password)
    items = load_data("portfolio.json")
    return sorted(items, key=lambda x: x.get("order", 0))


@app.post("/api/portfolio", summary="Create portfolio item (admin)")
def create_portfolio(item: PortfolioItem, x_admin_password: Optional[str] = Header(None)):
    check_auth(x_admin_password)
    items = load_data("portfolio.json")
    new_item = item.model_dump()
    new_item["id"] = str(uuid.uuid4())
    new_item["image"] = parse_image_url(new_item["image"])
    # Auto-assign order to end if not explicitly set
    if new_item.get("order", 0) == 0:
        new_item["order"] = len(items)
    items.append(new_item)
    save_data("portfolio.json", items)
    return new_item


@app.put("/api/portfolio/{item_id}", summary="Update portfolio item (admin)")
def update_portfolio(item_id: str, item: PortfolioItem, x_admin_password: Optional[str] = Header(None)):
    check_auth(x_admin_password)
    items = load_data("portfolio.json")
    for i, it in enumerate(items):
        if it["id"] == item_id:
            updated = item.model_dump()
            updated["id"] = item_id
            updated["image"] = parse_image_url(updated["image"])
            items[i] = updated
            save_data("portfolio.json", items)
            return updated
    raise HTTPException(status_code=404, detail="Portfolio item not found.")


@app.delete("/api/portfolio/{item_id}", summary="Delete portfolio item (admin)")
def delete_portfolio(item_id: str, x_admin_password: Optional[str] = Header(None)):
    check_auth(x_admin_password)
    items = load_data("portfolio.json")
    filtered = [i for i in items if i["id"] != item_id]
    if len(filtered) == len(items):
        raise HTTPException(status_code=404, detail="Portfolio item not found.")
    save_data("portfolio.json", filtered)
    return {"success": True, "deleted_id": item_id}


@app.patch("/api/portfolio/{item_id}/toggle", summary="Toggle portfolio item visibility (admin)")
def toggle_portfolio(item_id: str, x_admin_password: Optional[str] = Header(None)):
    check_auth(x_admin_password)
    items = load_data("portfolio.json")
    for item in items:
        if item["id"] == item_id:
            item["hidden"] = not item.get("hidden", False)
            save_data("portfolio.json", items)
            return item
    raise HTTPException(status_code=404, detail="Portfolio item not found.")


@app.patch("/api/portfolio/{item_id}/dev", summary="Toggle portfolio item under development (admin)")
def toggle_portfolio_dev(item_id: str, x_admin_password: Optional[str] = Header(None)):
    check_auth(x_admin_password)
    items = load_data("portfolio.json")
    for item in items:
        if item["id"] == item_id:
            item["under_development"] = not item.get("under_development", False)
            save_data("portfolio.json", items)
            return item
    raise HTTPException(status_code=404, detail="Portfolio item not found.")


@app.patch("/api/portfolio/reorder", summary="Reorder portfolio items (admin)")
def reorder_portfolio(req: ReorderRequest, x_admin_password: Optional[str] = Header(None)):
    check_auth(x_admin_password)
    items = load_data("portfolio.json")
    id_map = {it["id"]: it for it in items}
    for idx, item_id in enumerate(req.ids):
        if item_id in id_map:
            id_map[item_id]["order"] = idx
    save_data("portfolio.json", list(id_map.values()))
    return {"success": True}


# ─── Projects Routes ───────────────────────────────────────────────────────────

@app.get("/api/projects", summary="Get visible project items (public)")
def get_projects():
    items = load_data("projects.json")
    visible = [i for i in items if not i.get("hidden", False)]
    return sorted(visible, key=lambda x: x.get("order", 0))


@app.get("/api/projects/all", summary="Get all project items (admin)")
def get_projects_all(x_admin_password: Optional[str] = Header(None)):
    check_auth(x_admin_password)
    items = load_data("projects.json")
    return sorted(items, key=lambda x: x.get("order", 0))


@app.post("/api/projects", summary="Create project item (admin)")
def create_project(item: ProjectItem, x_admin_password: Optional[str] = Header(None)):
    check_auth(x_admin_password)
    items = load_data("projects.json")
    new_item = item.model_dump()
    new_item["id"] = str(uuid.uuid4())
    new_item["image"] = parse_image_url(new_item["image"])
    if new_item.get("order", 0) == 0:
        new_item["order"] = len(items)
    items.append(new_item)
    save_data("projects.json", items)
    return new_item


@app.put("/api/projects/{item_id}", summary="Update project item (admin)")
def update_project(item_id: str, item: ProjectItem, x_admin_password: Optional[str] = Header(None)):
    check_auth(x_admin_password)
    items = load_data("projects.json")
    for i, it in enumerate(items):
        if it["id"] == item_id:
            updated = item.model_dump()
            updated["id"] = item_id
            updated["image"] = parse_image_url(updated["image"])
            items[i] = updated
            save_data("projects.json", items)
            return updated
    raise HTTPException(status_code=404, detail="Project item not found.")


@app.delete("/api/projects/{item_id}", summary="Delete project item (admin)")
def delete_project(item_id: str, x_admin_password: Optional[str] = Header(None)):
    check_auth(x_admin_password)
    items = load_data("projects.json")
    filtered = [i for i in items if i["id"] != item_id]
    if len(filtered) == len(items):
        raise HTTPException(status_code=404, detail="Project item not found.")
    save_data("projects.json", filtered)
    return {"success": True, "deleted_id": item_id}


@app.patch("/api/projects/{item_id}/toggle", summary="Toggle project item visibility (admin)")
def toggle_project(item_id: str, x_admin_password: Optional[str] = Header(None)):
    check_auth(x_admin_password)
    items = load_data("projects.json")
    for item in items:
        if item["id"] == item_id:
            item["hidden"] = not item.get("hidden", False)
            save_data("projects.json", items)
            return item
    raise HTTPException(status_code=404, detail="Project item not found.")


@app.patch("/api/projects/{item_id}/dev", summary="Toggle project item under development (admin)")
def toggle_project_dev(item_id: str, x_admin_password: Optional[str] = Header(None)):
    check_auth(x_admin_password)
    items = load_data("projects.json")
    for item in items:
        if item["id"] == item_id:
            item["under_development"] = not item.get("under_development", False)
            save_data("projects.json", items)
            return item
    raise HTTPException(status_code=404, detail="Project item not found.")


@app.patch("/api/projects/reorder", summary="Reorder project items (admin)")
def reorder_projects(req: ReorderRequest, x_admin_password: Optional[str] = Header(None)):
    check_auth(x_admin_password)
    items = load_data("projects.json")
    id_map = {it["id"]: it for it in items}
    for idx, item_id in enumerate(req.ids):
        if item_id in id_map:
            id_map[item_id]["order"] = idx
    save_data("projects.json", list(id_map.values()))
    return {"success": True}


# ─── Health Check ──────────────────────────────────────────────────────────────

@app.get("/api/health")
def health():
    return {"status": "ok", "message": "Portfolio API is running."}
