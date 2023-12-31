"""Token

Revision ID: 772d11a24935
Revises: 01b4412eb3b5
Create Date: 2023-09-04 13:19:40.578259

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "772d11a24935"
down_revision: Union[str, None] = "01b4412eb3b5"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "Token",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("accesToken", sa.String(), nullable=True),
        sa.Column("userId", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["userId"],
            ["User.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_Token_accesToken"), "Token", ["accesToken"], unique=True)
    op.create_index(op.f("ix_Token_id"), "Token", ["id"], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_Token_id"), table_name="Token")
    op.drop_index(op.f("ix_Token_accesToken"), table_name="Token")
    op.drop_table("Token")
    # ### end Alembic commands ###
