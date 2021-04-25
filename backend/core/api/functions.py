import textblob, os, requests


def blob_perception_analysis(message):
    blob = textblob.TextBlob(message)
    original_blob = blob

    try:
        if blob.detect_language() != 'en':
            blob = blob.translate()
    except textblob.exceptions.NotTranslated:
        return {'error': 'Textul nu are nicio semnificație semantică.'}

    nouns = []
    for word, tag in blob.tags:
        if tag == 'NN' and len(nouns) <= 8:
            nouns.append(word)

    low_semantics = False
    text_parts = []
    for sentence in blob.sentences:
        sentence_parts = []
        for word, pos in sentence.tags:
            sentence_parts.append([word, pos])

        if len(sentence_parts) < 5:
            low_semantics = True

        text_parts.append(sentence_parts)

    avg_polarity = 0
    avg_subjectivity = 0

    for sentence in blob.sentences:
        avg_polarity += sentence.sentiment.polarity
        avg_subjectivity += sentence.sentiment.subjectivity

    return {
        'foregin':
        False if original_blob.detect_language() == 'en' else
        original_blob.detect_language(),
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
        'warning':
        None if low_semantics == False else
        "Textul dat conține propoziții cu înțeles semantic redus. Rezultatele nu vor fi corecte."
    }


def gpt2_generate(context, generator):
    blob = textblob.TextBlob(context)
    translated_blob = blob

    try:
        if blob.detect_language() != 'en':
            translated_blob = blob.translate()
    except textblob.exceptions.NotTranslated:
        return {
            'error': 'Textul este prea scurt pentru a fi tradus în engleză'
        }

    original_generation = generator(
        str(translated_blob), max_length=len(context) * 10,
        num_return_sequences=1)[0]['generated_text']
    blob_generation = textblob.TextBlob(original_generation)

    try:
        if blob.detect_language() != 'en':
            translated_generation = str(blob_generation.translate(to=blob.detect_language()))
        else:
            translated_generation = None
    except textblob.exceptions.NotTranslated as e:
        translated_generation = e

    results = {
        'original':
        original_generation,
        'translated':
        translated_generation
    }

    return results
