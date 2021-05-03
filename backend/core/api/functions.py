from typing import BinaryIO
import textblob, os, requests, torchvision, torch, base64, matplotlib, time
from io import BytesIO
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
from PIL import Image
from random import randint


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

    return {
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
        str(translated_blob),
        max_length=len(context) * 10,
        num_return_sequences=1)[0]['generated_text']
    blob_generation = textblob.TextBlob(original_generation)

    try:
        if blob.detect_language() != 'en':
            translated_generation = str(
                blob_generation.translate(to=blob.detect_language()))
        else:
            translated_generation = None
    except textblob.exceptions.NotTranslated as e:
        translated_generation = e

    results = {
        'original': original_generation,
        'translated': translated_generation
    }

    return results


def pgg_generator(model):
    torch.manual_seed(time.time())

    noise, _ = model.buildNoiseData(1)
    with torch.no_grad():
        generated_images = model.test(noise)

    matplotlib.use('agg')
    grid = torchvision.utils.make_grid(generated_images.clamp(min=-1, max=1),
                                       normalize=True)
    plt.figure(figsize=(5.12, 5.12), dpi=100)
    plt.axis('off')
    plt.imshow(grid.permute(1, 2, 0).cpu().numpy())
    buf = BytesIO()
    plt.savefig(buf,format='png')
    buf.seek(0)

    return {'image': u'data:img/png;base64,'+base64.b64encode(buf.getvalue()).decode('utf-8')}

def style_transfer(style,content,model):
    

    return {'image': u'data:img/png;base64,'}