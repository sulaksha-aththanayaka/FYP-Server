# import the inference-sdk
from inference_sdk import InferenceHTTPClient

def brandDetection(image_path):
    # initialize the client
    CLIENT = InferenceHTTPClient(
        api_url="https://detect.roboflow.com",
        api_key="salqYgy9Ccz6dI4gy420"
    )

    # infer on a local image
    result = CLIENT.infer(image_path, model_id="logo-detection-new-jzojt/1")

    # brand = result['predictions'][0]['class']

    # print(result)
    print(result['predictions'][0]['class'])


