import cv2
import pyvirtualcam
import numpy as np

def virtualCam():
    # Configurar la cámara virtual
    with pyvirtualcam.Camera(width=640, height=480, fps=30) as cam:
        # Crear el clasificador de rostros de OpenCV
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

        # Bucle principal para capturar y procesar los fotogramas de la cámara virtual
        while True:
            frame = np.zeros((cam.height, cam.width, 3), np.uint8)
            cam.send(frame)
            frame_captured = cam.get_la
            faces = face_cascade.detectMultiScale(gray, 1.3, 5)

            # Dibujar rectángulos alrededor de los rostros detectados
            for (x, y, w, h) in faces:
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

            # Esperar la tecla 'Esc' para salir del bucle
            if cv2.waitKey(1) == 27:
                break

virtualCam()
 
# import cv2
# import pyvirtualcam
# import pyautogui
# import numpy as np
# import time

# # Configurar la cámara virtual
# with pyvirtualcam.Camera(width=640, height=480, fps=30) as cam:
#     while True:
#         # Capturar la pantalla
#         screenshot = pyautogui.screenshot()
#         frame = np.array(screenshot)

#         # Convertir la imagen de la pantalla a formato BGR (OpenCV)
#         frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

#         # Redimensionar el marco para que coincida con el tamaño de la cámara virtual
#         frame = cv2.resize(frame, (cam.width, cam.height))

#         # Enviar el marco a la cámara virtual
#         cam.send(frame)

#         # Esperar un breve período de tiempo antes de capturar el siguiente marco
#         time.sleep(1)
