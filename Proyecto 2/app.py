import time
import webbrowser
import pyautogui

def abrir_reunion_google_meet(enlace_reunion):
    webbrowser.open(enlace_reunion)
    time.sleep(5)
    pyautogui.press('tab')
    pyautogui.press('tab')
    pyautogui.press('tab')
    pyautogui.press('tab')
    pyautogui.press('tab')
    pyautogui.press('tab')
    pyautogui.press('tab')
    pyautogui.press('tab')
    pyautogui.press('tab')
    pyautogui.press('tab')
    pyautogui.press('tab')
    pyautogui.press('enter')

def cerrar_sesion():
   enlace_reinicio_sesion = "https://accounts.google.com/AccountChooser/signinchooser?continue=https%3A%2F%2Fmeet.google.com%2Fxyy-fvrx-mip%3Fauthuser%3D1&hl=es&ddm=0&flowName=GlifWebSignIn&flowEntry=AccountChooser"
   pyautogui.hotkey('command', 'w')
   webbrowser.open(enlace_reinicio_sesion)

def escribir_en_chat(texto):
    time.sleep(4)
    pyautogui.typewrite(texto)
    pyautogui.press('enter')


def reunion_Meet():
    enlace_reunion = "https://meet.google.com/obu-inzg-muc"
    abrir_reunion_google_meet(enlace_reunion)
    time.sleep(3)
    #pyautogui.hotkey('ctrl', 'command', 'c')
    pyautogui.hotkey('ctrl', 'alt', 'c')
    escribir_en_chat("Hola equipo")


