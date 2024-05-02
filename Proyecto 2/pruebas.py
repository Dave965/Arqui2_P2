import pyvirtualcam
import cv2

cap = cv2.VideoCapture(0)
with pyvirtualcam.Camera(width=1280, height=720, fps=20) as cam:
    while True:
        ret_val, frame = cap.read()

        frame = cv2.resize(frame, (1280, 720), interpolation=cv2.BORDER_DEFAULT)
        # cv2.imshow('my webcam', frame)
        cam.send(frame)
        cam.sleep_until_next_frame()
        if cv2.waitKey(1) == 27:
            break  # esc to quit
    cv2.destroyAllWindows()