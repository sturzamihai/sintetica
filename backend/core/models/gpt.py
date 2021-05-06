from textblob import translate
from transformers import pipeline, set_seed, AutoTokenizer, AutoModelWithLMHead
import textblob


class GPT:
    def __init__(self):
        self.model = pipeline('text-generation', model='gpt2')
        self.errors = []

    def __translate(self, text):
        original = textblob.TextBlob(text)
        language = original.detect_language()
        translated = text

        try:
            if language != 'en':
                translated = str(original.translate())
        except textblob.exceptions.NotTranslated as e:
            translated = None
            self.errors.append(
                f"Textul dat nu a fost tradus (REF:{text[:int((len(text)/2))]}.../{language}->'en')"
            )

        return translated, language

    def __translate_to_language(self, text, language):
        original = textblob.TextBlob(text)
        detected = original.detect_language()
        try:
            if language != 'en':
                translated = str(original.translate(to=language))
            else:
                translated = None
        except textblob.exceptions.NotTranslated as e:
            translated = None
            self.errors.append(
                f"Textul dat nu a fost tradus (REF:{text[:int((len(text)/2))]}.../'{detected}'->{language})"
            )

        return translated

    def predict(self, prefix):
        en_prefix, language = self.__translate(prefix)
        generated = None
        translation = None
        print(language)

        if en_prefix:
            generated = self.model(en_prefix,
                                   max_length=len(prefix) * 10,
                                   num_return_sequences=1)[0]['generated_text']

            translation = self.__translate_to_language(generated, language)

        return generated, translation
