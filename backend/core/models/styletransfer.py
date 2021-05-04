import tensorflow_hub as tf_hub
import tensorflow as tf
import base64, re
import numpy as np
from io import BytesIO
import matplotlib
import matplotlib.pyplot as plt
from PIL import Image
import matplotlib.image as mpimg

class StyleTransfer:
    def __init__(self):
        matplotlib.use('agg')
        self.model = tf_hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')

    def __decode_image(self, image):
        image = base64.b64decode(re.sub(r'^data:image/.+;base64,', '', image))
        image = BytesIO(image)
        image = np.array(Image.open(image))
        image = image.astype(np.float32)[np.newaxis,...]/255.

        return image

    def __encode_image(self, image):
        plt.figure(figsize=(5.12, 5.12), dpi=100)
        plt.axis('off')
        plt.imshow(image[0])
        buf = BytesIO()
        plt.savefig(buf,format='png')
        buf.seek(0)

        return u'data:img/png;base64,' + base64.b64encode(buf.getvalue()).decode('utf-8')

    def predict(self, content, style):
        style = self.__decode_image(style)
        content = self.__decode_image(content)

        style = tf.image.resize(style, (256,256))

        output = self.model(tf.constant(content), tf.constant(style))

        return self.__encode_image(output[0])
