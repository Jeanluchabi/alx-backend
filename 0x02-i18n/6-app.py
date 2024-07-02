#!/usr/bin/env python3
""" This is a mock user login system for a Flask app."""


from flask import Flask, render_template, g, request
from flask_babel import Babel, gettext


app = Flask(__name__)
babel = Babel(app)


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


def get_locale():
    """Get the user's preferred locale."""
    # 1. Locale from URL parameters
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale

    # 2. Locale from user settings
    if hasattr(g, 'user') and g.user and 'locale' in g.user \
            and g.user['locale'] in app.config['LANGUAGES']:
        return g.user['locale']

    # 3. Locale from request header
    best_locale = request.accept_languages.best_match(app.config['LANGUAGES'])
    if best_locale:
        return best_locale

    # 4. Default locale
    return app.config['BABEL_DEFAULT_LOCALE']


@app.before_request
def before_request():
    """Set the user in the global context if provided."""
    user_id = request.args.get("login_as")
    g.user = get_user(int(user_id)) if user_id else None


@app.route('/')
def index():
    """Render the index page."""
    return render_template('6-index.html')


if __name__ == '__main__':
    app.run(debug=True)
