"""add nullanle img Quiz

Revision ID: 4a14e49a9596
Revises: 6869097f971c
Create Date: 2023-09-24 17:12:54.744730

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "4a14e49a9596"
down_revision: Union[str, None] = "6869097f971c"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column("Quiz", "image", existing_type=sa.VARCHAR(), nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column("Quiz", "image", existing_type=sa.VARCHAR(), nullable=False)
    # ### end Alembic commands ###
