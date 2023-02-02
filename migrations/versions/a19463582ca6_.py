"""empty message

Revision ID: a19463582ca6
Revises: fa6f314c3864
Create Date: 2023-02-02 23:31:22.553873

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a19463582ca6'
down_revision = 'fa6f314c3864'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('crearevento', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(length=120), nullable=True))
        batch_op.drop_constraint('crearevento_organizador_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['username'], ['username'])
        batch_op.drop_column('organizador_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('crearevento', schema=None) as batch_op:
        batch_op.add_column(sa.Column('organizador_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('crearevento_organizador_id_fkey', 'user', ['organizador_id'], ['id'])
        batch_op.drop_column('username')

    # ### end Alembic commands ###
