import os

from flask import Flask
from flask_cors import CORS
from transformers import pipeline, set_seed, AutoTokenizer, AutoModelWithLMHead
import torch
import tensorflow_hub as tf_hub

from config import BaseConfig


def create_app(environment):
    app = Flask(__name__)

    app.config.from_object(environment)

    from core.models import GPT
    app.config['GPT_GENERATOR'] = GPT()

    from core.models import PGGANs
    app.config['PGG_MODEL'] = PGGANs()

    from core.models import StyleTransfer
    app.config['ST_MODEL'] = StyleTransfer()

    from core.api.controller import api

    cors = CORS(app, resources={r'/api/*': {'origins': BaseConfig.ORIGINS}})

    app.url_map.strict_slashes = False

    app.register_blueprint(api, url_prefix="/api")

    return app
