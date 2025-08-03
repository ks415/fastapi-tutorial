from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional

from api.models.user import User
from api.schemas.user import UserCreate
from api.auth import get_password_hash, verify_password


async def get_user_by_username(db: AsyncSession, username: str) -> Optional[User]:
    """ユーザー名でユーザーを取得"""
    result = await db.execute(select(User).filter(User.username == username))
    return result.scalars().first()


async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
    """メールアドレスでユーザーを取得"""
    result = await db.execute(select(User).filter(User.email == email))
    return result.scalars().first()


async def get_user_by_id(db: AsyncSession, user_id: int) -> Optional[User]:
    """IDでユーザーを取得"""
    result = await db.execute(select(User).filter(User.id == user_id))
    return result.scalars().first()


async def create_user(db: AsyncSession, user: UserCreate) -> User:
    """新しいユーザーを作成"""
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user


async def authenticate_user(db: AsyncSession, username: str, password: str) -> Optional[User]:
    """ユーザーを認証"""
    user = await get_user_by_username(db, username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user
