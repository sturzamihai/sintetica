class BaseConfig(object):
    ORIGINS = ["*"]

class Development(BaseConfig):
    PORT = 5000
    DEBUG = True
    ENV = 'dev'
    APPNAME = 'SinteticaAPIDev'
    TR_SEED = 50

class Production(BaseConfig):
    PORT = 5000
    DEBUG = False
    ENV = 'prod'
    APPNAME = 'SinteticaAPIProd'
    TR_SEED = 150