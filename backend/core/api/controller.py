from flask import Blueprint, json, jsonify, request
from werkzeug.exceptions import abort
from .functions import blob_perception_analysis

api = Blueprint('api', __name__)

@api.route('/perception', methods=['GET'])
def get_index():
    packet = request.json
    if packet:
        try:
            blob = packet["blob"]

            return blob_perception_analysis(blob)
        except KeyError as e:
            abort(400, f"Cannot find key {e}, found {', '.join(packet.keys())}")
    else:
        abort(400, f"Expected JSON, got {type(request.json).__name__}")

    abort(500)