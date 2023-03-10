"""empty message

Revision ID: 455c2cde3f55
Revises: c6d8738ffc51
Create Date: 2023-01-24 13:46:35.838164

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '455c2cde3f55'
down_revision = 'c6d8738ffc51'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('username', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('firstname', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('lastname', sa.String(length=120), nullable=False))
    op.alter_column('user', 'password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=120),
               comment=None,
               existing_comment='comment',
               existing_nullable=False)
    op.alter_column('user', 'is_active',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    op.create_unique_constraint(None, 'user', ['username'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='unique')
    op.alter_column('user', 'is_active',
               existing_type=sa.BOOLEAN(),
               nullable=False)
    op.alter_column('user', 'password',
               existing_type=sa.String(length=120),
               type_=sa.VARCHAR(length=80),
               comment='comment',
               existing_nullable=False)
    op.drop_column('user', 'lastname')
    op.drop_column('user', 'firstname')
    op.drop_column('user', 'username')
    # ### end Alembic commands ###
