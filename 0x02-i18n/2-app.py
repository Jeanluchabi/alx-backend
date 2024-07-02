#!/usr/bin/env python3
"""This is a  flask app that determines best_match with supported languages"""


from flask import Flask, render_template, request
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)


# Define the supported languages
SUPPORTED_LANGUAGES = ['en', 'fr']


@babel.localeselector
def get_locale():
    """Determine the best-matched language from the request's
    accepted languages"""
    return request.accept_languages.best_match(SUPPORTED_LANGUAGES)


@app.route('/')
def index():
    """Default page"""
    return render_template('2-index.html')


if __name__ == '__main__':
    app.run(debug=True)
