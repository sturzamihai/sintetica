from flask import Blueprint, json, jsonify, request, current_app
from werkzeug.exceptions import abort
from .functions import blob_perception_analysis, gpt2_generate

api = Blueprint('api', __name__)

@api.route('/perception', methods=['POST'])
def post_perception():
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

@api.route('/textgen', methods=['POST'])
def post_gpt():
    packet = request.json
    if packet:
        try:
            context = packet['context']
            try:
                generator = current_app.config['GPT_GENERATOR']
            except KeyError as e:
                abort(503, "GPT model not initialized.")

            return gpt2_generate(context,generator)
        except KeyError as e:
            abort(400, f"Cannot find key {e}, found {', '.join(packet.keys())}")
    else:
        abort(400, f"Expected JSON, got {type(request.json).__name__}")

    abort(500)