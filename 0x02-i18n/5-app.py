#!/usr/bin/env python3
"""This is a mock user login system for a Flask app."""


from flask import Flask, render_template, g, request


app = Flask(__name__)


# Mock user database
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user(user_id):
    """Get user information based on user ID."""
    return users.get(user_id)


@app.before_request
def before_request():
    """Set the user in the global context if provided."""
    user_id = request.args.get("login_as")
    g.user = get_user(int(user_id)) if user_id else None


@app.route('/')
def index():
    """Render the index page."""
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run(debug=True)
