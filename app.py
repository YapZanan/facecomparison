import base64
import os
import sys
import cv2
import eel
import numpy as np
from concurrent.futures import ThreadPoolExecutor
from deepface import DeepFace

# Get the current working directory (the folder where the Python script is located)
if getattr(sys, 'frozen', False):  # If running as a bundled app (PyInstaller)
    # If running as a bundled app, get the path from sys._MEIPASS
    current_directory = sys._MEIPASS
else:
    # If running as a script, use the normal directory
    current_directory = os.path.dirname(os.path.abspath(__file__))

# Set the relative path to your 'web' folder
web_folder = os.path.join(current_directory, 'web')  # Ensure 'web' is in the same directory as your script
eel.init(web_folder)


def base64_to_np_array(base64_data):
    # Strip the base64 header and decode
    image_data = base64.b64decode(base64_data.split(",")[1])
    # Convert to NumPy array
    np_array = np.frombuffer(image_data, dtype=np.uint8)
    # Decode into an image (BGR format)
    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    return image


# Function to rescale the image down by a factor of 5
def rescale_image(image, scale_factor=5):
    width = int(image.shape[1] / scale_factor)
    height = int(image.shape[0] / scale_factor)
    # Rescale image
    return cv2.resize(image, (width, height), interpolation=cv2.INTER_AREA)


@eel.expose
def receive_images(image1_data, image2_data, model="VGG-Face"):
    try:
        def process_image(image_data):
            image_array = base64_to_np_array(image_data)
            return rescale_image(image_array)

        # Use ThreadPoolExecutor to process images concurrently
        with ThreadPoolExecutor() as executor:
            future1 = executor.submit(process_image, image1_data)
            future2 = executor.submit(process_image, image2_data)

            image1_rescaled = future1.result()
            image2_rescaled = future2.result()

        # Perform DeepFace verification using the rescaled images
        result = DeepFace.verify(img1_path=image1_rescaled, img2_path=image2_rescaled,
                                 distance_metric='cosine', model_name=model)

        # Print only the distance from the result
        print("Distance:", 1 - result['distance'])

        return 1 - result['distance']

    except Exception as e:
        print(f"Error processing images: {e}")
        return {"error": str(e)}


# Start the app, ensuring index.html exists in the 'web' folder
if __name__ == '__main__':
    eel.start('index.html', size=(1280, 720))
