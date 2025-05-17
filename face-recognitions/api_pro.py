import cv2
import face_recognition
import os
from flask import Flask, request, jsonify
from flask_cors import CORS,cross_origin
import shutil
from PIL import Image
import re
from flask_sslify import SSLify
from keras.models import load_model
from keras_preprocessing.image import img_to_array
import numpy as np
input = "input"
if not os.path.exists(input):
    os.makedirs(input)
emotion_model = "./models/_mini_XCEPTION.106-0.65.hdf5"
Emotions = ["angry","disgust","scared","happy","sad","surprised","neutral"]
face_cascade = cv2.CascadeClassifier('./models/haarcascade_frontalface_default.xml')
emotion_classifier = load_model(emotion_model,compile=False)

app = Flask(__name__)
cors = CORS(app)
sslify = SSLify(app)
dataset = "dataset"
if not os.path.exists(dataset):
    os.makedirs(dataset)

trash = "trash"
if not os.path.exists(trash):
        os.makedirs(trash)

@app.route('/delete-dataset', methods=['DELETE'])
def delDataset():
    if 'name' not in request.form:
        return jsonify({'error': 'No name selected'}), 400
    name = request.form['name']
    if not os.path.exists(os.path.join(dataset, name+".jpg")):
        return jsonify({'error': 'Model not found'}), 400
    else:
        os.remove(os.path.join(dataset, name+".jpg"))
        return "Model supprimé"

@app.route('/create-dataset', methods=['POST'])
def createDataset():
    print('test')
    if 'img' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    if 'names' not in request.form:
        return jsonify({'error': 'No names selected'}), 400
    img = request.files['img']
    names = request.form['names']
    if img.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    image = Image.open(img)
    print(img.filename)
    try:
        image.save(os.path.join(trash, img.filename))
        img_data = face_recognition.load_image_file(os.path.join(trash, '{}'.format(img.filename)))
        rgb_img = cv2.cvtColor(img_data, cv2.COLOR_BGR2RGB)
        face_recognition.face_encodings(rgb_img)[0]
        cv2.imwrite(os.path.join(dataset, '{}.jpg'.format(names)), rgb_img)
        return "Image enregistré"
    except:
        return jsonify({'error': 'Image non acceptée'}), 400

@app.route('/recognize', methods=['POST'])
def recognize():
    if 'img' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    img = request.files['img']
    print(img)
    if img.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    image = Image.open(img)
    try:
        image.save(os.path.join(trash, img.filename))
        data_img = cv2.imread(os.path.join(trash, '{}'.format(img.filename)))
        modelPath = [os.path.join(dataset,f) for f in os.listdir(dataset)]
        rgb_img = cv2.cvtColor(data_img, cv2.COLOR_BGR2RGB)
        for f in modelPath:
            image = cv2.imread(f)
            model = face_recognition.face_encodings(image)[0]
            data = face_recognition.face_encodings(rgb_img)[0]
            result = face_recognition.compare_faces([data], model)
            if result[0]:
                filename_without_extension = re.sub(r'\.jpg$', '', f.split('/')[1])
                return filename_without_extension
            else:
                pass
        return jsonify({'error': 'Model not found'}), 400
    except:
        print("face not found")
        return jsonify({'error': 'Face not found'}), 400

@app.route('/emotion', methods=['POST'])
def getEmotion():
    if 'img' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    img = request.files['img']
    if img.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    image = Image.open(img)
    image.save(os.path.join(input, img.filename))
    img_data = cv2.imread(os.path.join(input,'{}'.format(img.filename)))
    gray = cv2.cvtColor(img_data, cv2.COLOR_BGR2GRAY)
    face = face_cascade.detectMultiScale(image=gray, scaleFactor=1.3, minNeighbors=5)
    os.remove(os.path.join(input, img.filename))
    try:
        for x, y, w, h in face:
            roi = gray[y:y + h, x:x + w]
            roi = cv2.resize(roi, (48, 48))
            roi = roi.astype("float") / 255.0
            roi = img_to_array(roi)
            roi = np.expand_dims(roi, axis=0)
            preds = emotion_classifier.predict(roi)[0]
            emotion_probability = np.max(preds)
            print(emotion_probability)
            label = Emotions[preds.argmax()]
        return label
    except:
        return jsonify({'error': 'No face detected'}), 400
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000, debug=True)
