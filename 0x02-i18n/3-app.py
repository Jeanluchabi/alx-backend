#!/usr/bin/env python3
"""This is a flask app with localization using Flask-Babel.
"""
from flask import Flask, render_template
from flask_babel import Babel, _  # Import the _ function


app = Flask(__name__)
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'
babel = Babel(app)


@app.route('/')
def index():
    """Render the index page."""
    return render_template('3-index.html',
                           home_title=_('Welcome to Holberton'),
                           home_header=_('Hello world!'))


if __name__ == '__main__':
    app.run(debug=True)
