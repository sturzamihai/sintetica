import textblob

def blob_perception_analysis(message):
    blob = textblob.TextBlob(message)
    blob = blob.translate()

    nouns = []
    for word, tag in blob.tags:
        if tag == 'NN' and len(nouns)<=8:
            nouns.append(word)

    text_parts = []
    for word, pos in blob.tags:
        text_parts.append([word, pos])

    avg_polarity = 0
    avg_subjectivity = 0

    for sentence in blob.sentences:
        avg_polarity += sentence.sentiment.polarity
        avg_subjectivity += sentence.sentiment.subjectivity

    return {
        'sentences': len(blob.sentences),
        'tags': text_parts,
        'polarity': avg_polarity/len(blob.sentences),
        'subjectivity': avg_subjectivity/len(blob.sentences),
        'summary': nouns
    }