import os

from flask import Flask
from flask_cors import CORS

from config import BaseConfig

def create_app(environment):
    app = Flask(__name__)

    app.config.from_object(environment)

    from core.api.controller import api

    cors = CORS(app, resources={
        r'/api/*': {
            'origins': BaseConfig.ORIGINS
        }
    })

    app.url_map.strict_slashes = False

    app.register_blueprint(api, url_prefix="/api")

    return app