"""'addDeleteCascadeToken'

Revision ID: 48690cb182e0
Revises: 635e1c7ab4cc
Create Date: 2023-11-09 21:34:53.235962

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '48690cb182e0'
down_revision: Union[str, None] = '635e1c7ab4cc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('Token_userId_fkey', 'Token', type_='foreignkey')
    op.create_foreign_key(None, 'Token', 'User', ['userId'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'Token', type_='foreignkey')
    op.create_foreign_key('Token_userId_fkey', 'Token', 'User', ['userId'], ['id'])
    # ### end Alembic commands ###
