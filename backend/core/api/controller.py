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
            abort(400,
                  f"Cannot find key {e}, found {', '.join(packet.keys())}")
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

            return gpt2_generate(context, generator)
        except KeyError as e:
            abort(400,
                  f"Cannot find key {e}, found {', '.join(packet.keys())}")
    else:
        abort(400, f"Expected JSON, got {type(request.json).__name__}")

    abort(500)


@api.route('/pgg', methods=['GET'])
def get_pgg():
    try:
        model = current_app.config['PGG_MODEL']
    except KeyError as e:
        abort(503, "PGG model not initialized.")

    return {"image": model.predict()}

    abort(500)


@api.route('/transfer', methods=['POST'])
def post_transfer():
    packet = request.json
    if packet:
        try:
            content = packet['content']
            style = packet['style']
            try:
                model = current_app.config['ST_MODEL']
            except KeyError as e:
                abort(503, "Style Transfer model not initialized.")

            return {"image": model.predict(content, style)}
        except KeyError as e:
            abort(400,
                  f"Cannot find key {e}, found {', '.join(packet.keys())}")
    else:
        abort(400, f"Expected JSON, got {type(request.json).__name__}")

    abort(500)