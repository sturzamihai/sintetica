import textblob

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
        if tag == 'NN' and len(nouns)<=8:
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
        'foregin': False if original_blob.detect_language() == 'en' else original_blob.detect_language(),
        'sentences': len(blob.sentences),
        'tags': text_parts,
        'polarity': avg_polarity/len(blob.sentences),
        'subjectivity': avg_subjectivity/len(blob.sentences),
        'summary': nouns,
        'warning': None if low_semantics == False else "Textul dat conține propoziții cu înțeles semantic redus. Rezultatele nu vor fi corecte."
    }