import matplotlib, base64, torch, torchvision, time
import matplotlib.pyplot as plt
from io import BytesIO

class PGGANs:
    def __init__(self):
        self.model = torch.hub.load(
        'facebookresearch/pytorch_GAN_zoo:hub',
        'PGAN',
        model_name='celebAHQ-512',
        pretrained=True,
        useGPU=False)
        torch.manual_seed(time.time())

    def __encode_image(self,image):
        plt.figure(figsize=(5.12, 5.12), dpi=100)
        plt.axis('off')
        plt.imshow(image.permute(1, 2, 0).cpu().numpy())
        buf = BytesIO()
        plt.savefig(buf,format='png')
        buf.seek(0)

        return u'data:img/png;base64,'+base64.b64encode(buf.getvalue()).decode('utf-8')

    def predict(self):
        noise, _ = self.model.buildNoiseData(1)
        with torch.no_grad():
            generated_images = self.model.test(noise)

        matplotlib.use('agg')
        grid = torchvision.utils.make_grid(generated_images.clamp(min=-1, max=1),
                                        normalize=True)

        return self.__encode_image(grid)