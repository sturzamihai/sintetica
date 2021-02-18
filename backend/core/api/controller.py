from flask import Blueprint, jsonify
from .functions import blob_perception_analysis

api = Blueprint('api', __name__)

@api.route('/', methods=['GET'])
def get_index():
    return blob_perception_analysis("U suck")