#!/usr/bin/env python3
"""This is a flask app that force a particular locale"""


from flask import Flask, render_template, request
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)


# Define the supported languages
SUPPORTED_LANGUAGES = ['en', 'fr']


# Set the default locale and timezone
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'


@babel.localeselector
def get_locale():
    """Check if the 'locale' parameter is present in the request URL"""
    locale = request.args.get('locale')
    if locale in SUPPORTED_LANGUAGES:
        return locale
    return app.config['BABEL_DEFAULT_LOCALE']


@app.route('/')
def index():
    """Default page"""
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
