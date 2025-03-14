from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from api.cruds.task import create_task, get_tasks_with_done, get_task, update_task, delete_task
from api.db import get_db
from typing import List
import api.schemas.task as task_schema

router = APIRouter()


@router.get("/tasks", response_model=List[task_schema.Task])
async def list_tasks(db: AsyncSession = Depends(get_db)):
    return await get_tasks_with_done(db)


@router.post("/tasks", response_model=task_schema.TaskCreateResponse)
async def create_task_endpoint(
    task_body: task_schema.TaskCreate, db: AsyncSession = Depends(get_db)
):
    return await create_task(db, task_body)


@router.put("/tasks/{task_id}", response_model=task_schema.TaskCreateResponse)
async def update_task_endpoint(
    task_id: int, task_body: task_schema.TaskCreate, db: AsyncSession = Depends(get_db)
):
    task = await get_task(db, task_id=task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return await update_task(db, task_body, original=task)


@router.delete("/tasks/{task_id}", response_model=None)
async def delete_task_endpoint(task_id: int, db: AsyncSession = Depends(get_db)):
    task = await get_task(db, task_id=task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return await delete_task(db, original=task)
