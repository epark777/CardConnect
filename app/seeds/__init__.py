from flask.cli import AppGroup
from .users import seed_users, undo_users
from .business_cards import seed_business_cards, undo_business_cards
from .categories import seed_categories, undo_categories
from .notes import seed_notes, undo_notes
from .shares import seed_shares, undo_shares

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_shares()
        undo_notes()
        undo_categories()
        undo_business_cards()
            
    seed_users()
    # Add other seed functions here
    seed_business_cards()
    seed_categories()
    seed_notes()
    seed_shares()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_shares()
    undo_notes()
    undo_categories()
    undo_business_cards()
