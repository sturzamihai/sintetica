# Sintetica
## Generarea conținutului sintetic prin inteligență artificială

### Abstract
Sintetica este o interfata web care comunica cu algoritmi puternici si moderni din domeniul inteligentei artificiale. Scopul proiectului este de a informa despre ce pot cu adevarat astfel de sisteme inteligente intr-un mod cat mai simplu pentru utilizator.

Sintetica este un semnal de alarma pentru riscul ce il prezinta folosirea acestor algoritmi de persoane nepotrivite, care au alte scopuri decat cele educationale. Putem vedea o multime de astfel de pericole in jurul nostru: de la Deep Fakes la Fake News, care sunt ajutate de astfel de algoritmi generativi.

### Structura API
- /api (Blueprint)
Ruta-părinte pentru toate conexiunile referitoare la API.
    - /perception (POST)
    Așteaptă un JSON ce conține „key”-ul „blob” cu informații de tip text. Dă inapoi un JSON ce conține „key”-urile: „sentences”, „tags, „polarity”, „subjectivity”, „summary”, „warnings”.
    - /textgen (POST)
    Așteaptă un JSON ce conține „key”-ul „context” cu informații de tip text. Dă inapoi un JSON ce conține „key”-urile: „original”, „translated”, „errors”
    - /pgg (GET)
    Trimite un JSON o imagine sub forma unui „blob” in base64 in „key”-ul „image”.
    - /transfer (POST)
    Așteaptă un JSON ce conține „key”-urile „content”, „style” cu informații „blob” in base64. Dă inapoi un JSON ce conține o imagine sub forma unui „blob” in base64 in „key”-ul „image”.
