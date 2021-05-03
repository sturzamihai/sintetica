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

    app.config['GPT_GENERATOR'] = pipeline('text-generation', model='gpt2')
    set_seed(app.config['TR_SEED'])

    app.config['PGG_MODEL'] = torch.hub.load(
        'facebookresearch/pytorch_GAN_zoo:hub',
        'PGAN',
        model_name='celebAHQ-512',
        pretrained=True,
        useGPU=False)

    app.config['ST_MODEL'] = tf_hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')

    from core.api.controller import api

    cors = CORS(app, resources={r'/api/*': {'origins': BaseConfig.ORIGINS}})

    app.url_map.strict_slashes = False

    app.register_blueprint(api, url_prefix="/api")

    return app
