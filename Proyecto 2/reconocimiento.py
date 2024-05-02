import serial
import time
import cv2
import os
from app import reunion_Meet, cerrar_sesion

sesion = ''
serialObj = serial.Serial("COM3",9600) #cambiar el numero de com a donde este el arduino
serialObj.timeout = 12



def reconocimiento():
    global sesion
    dataPath = './Data' 
    imagePaths = os.listdir(dataPath)
    print('imagePaths=',imagePaths)

    face_recognizer = cv2.face.EigenFaceRecognizer_create()

    face_recognizer.read('modeloEigenFace.xml')

    cap = cv2.VideoCapture(1,cv2.CAP_DSHOW)

    faceClassif = cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml')

    recognizedFace = False
    salir = False
    while True:
        if salir: break
        ret,frame = cap.read()
        if ret == False: break
        
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        auxFrame = gray.copy()

        faces = faceClassif.detectMultiScale(gray,1.3,5)

        for (x,y,w,h) in faces:
            rostro = auxFrame[y:y+h,x:x+w]
            rostro = cv2.resize(rostro,(150,150),interpolation= cv2.INTER_CUBIC)
            result = face_recognizer.predict(rostro)

            if result[1] < 5700:
                if not recognizedFace:
                    cv2.putText(frame,'{}'.format(imagePaths[result[0]]),(x,y-25),2,1.1,(0,255,0),1,cv2.LINE_AA)
                    cv2.rectangle(frame, (x,y),(x+w,y+h),(0,255,0),2)
                    reunion_Meet()
                    recognizedFace = True
                    sesion = imagePaths[result[0]]
                    serialObj.write(b's')
                    time.sleep(0.1)
                elif imagePaths[result[0]] == sesion:
                    cv2.putText(frame,'{}'.format(imagePaths[result[0]]),(x,y-25),2,1.1,(0,255,0),1,cv2.LINE_AA)
                    cv2.rectangle(frame, (x,y),(x+w,y+h),(0,255,0),2)
                    leido = serialObj.read()
                    print(leido)
                    if leido == b'0':
                        serialObj.write(bytes(str(x+w/2)+"|"+str(y+h/2)+"|", 'utf-8'))
                        time.sleep(0.2)
                    elif leido == b'1':
                        cerrar_sesion()
                        recognizedFace = False
                        salir = True
                        break
                elif sesion == '':
                    cv2.putText(frame,'Desconocido',(x,y-20),2,0.8,(0,0,255),1,cv2.LINE_AA)
                    cv2.rectangle(frame, (x,y),(x+w,y+h),(0,0,255),2)
                    serialObj.write(b'n')
                    time.sleep(0.1)
            
        cv2.imshow('frame',frame)
        k = cv2.waitKey(1)
        if k == 27:
            break

    cap.release()
    cv2.destroyAllWindows()
