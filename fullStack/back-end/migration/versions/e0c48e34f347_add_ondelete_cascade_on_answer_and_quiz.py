"""add ondelete cascade on answer and quiz

Revision ID: e0c48e34f347
Revises: c6be7d2ced1d
Create Date: 2023-09-28 19:31:31.348572

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "e0c48e34f347"
down_revision: Union[str, None] = "c6be7d2ced1d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint("Answer_questionId_fkey", "Answer", type_="foreignkey")
    op.create_foreign_key(
        None, "Answer", "Question", ["questionId"], ["id"], ondelete="CASCADE"
    )
    op.drop_constraint("Quiz_authorId_fkey", "Quiz", type_="foreignkey")
    op.create_foreign_key(
        None, "Quiz", "User", ["authorId"], ["id"], ondelete="CASCADE"
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, "Quiz", type_="foreignkey")
    op.create_foreign_key("Quiz_authorId_fkey", "Quiz", "User", ["authorId"], ["id"])
    op.drop_constraint(None, "Answer", type_="foreignkey")
    op.create_foreign_key(
        "Answer_questionId_fkey", "Answer", "Question", ["questionId"], ["id"]
    )
    # ### end Alembic commands ###
