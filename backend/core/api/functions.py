from flask.helpers import make_response
from flask.json import jsonify
from flask import abort
from nltk import text
from tensorflow.python.autograph.core.ag_ctx import Status
import textblob

def blob_perception_analysis(message):
    blob = textblob.TextBlob(message)

    api_warnings = []

    try:
        blob_language = blob.detect_language()
        if blob_language != 'en':
            blob = blob.translate()
            api_warnings.append(f'Datorită datelor limitate in limba aleasă ({blob_language}) textul a fost tradus in engleză.')
    except textblob.exceptions.NotTranslated:
        return {'error': 'Textul nu are nicio semnificație semantică.'}

    nouns = []
    for word, tag in blob.tags:
        if tag == 'NN' and len(nouns) <= 8:
            nouns.append(word)

    text_parts = []
    for sentence in blob.sentences:
        sentence_parts = []
        for word, pos in sentence.tags:
            sentence_parts.append([word, pos])

        text_parts.append(sentence_parts)
    
    if(len(max(text_parts)) < 7 or len(min(text_parts)) < 5):
        api_warnings.append("Textul dat conține propoziții cu înțeles semantic redus. Rezultatele nu vor fi la fel de bune.")


    avg_polarity = 0
    avg_subjectivity = 0

    for sentence in blob.sentences:
        avg_polarity += sentence.sentiment.polarity
        avg_subjectivity += sentence.sentiment.subjectivity

    return jsonify({
        'sentences':
        len(blob.sentences),
        'tags':
        text_parts,
        'polarity':
        avg_polarity / len(blob.sentences),
        'subjectivity':
        avg_subjectivity / len(blob.sentences),
        'summary':
        nouns,
        'warnings': api_warnings
    })

def api_abort(status, message):
    abort(make_response(jsonify(status=status, error=message),status))