import tkinter as tk
from tkinter import ttk
from tkinter import simpledialog
from faceRecognition import *
from tkinter import *
from getData import *
from training import *
from reconocimiento import *
from app import *

class Principal:
    def __init__(self, root):
        self.root = root
        self.root.title('Principal')
        self.root.geometry('400x200')
        self.root.resizable(False, False)

        self.label = ttk.Label(self.root, text='BIENVENIDO')
        self.label.pack(pady=10)

        self.buttonNewUser = ttk.Button(self.root, text='Agregar Usuario', command=self.add_user)
        self.buttonNewUser.pack(pady=10)

        self.buttonTrain = ttk.Button(self.root, text='Entrenar', command=self.train)
        self.buttonTrain.pack(pady=10)

        self.buttonLogin = ttk.Button(self.root, text='Iniciar Sesión', command=self.login)
        self.buttonLogin.pack(pady=10)

    def open_secondary(self):
        self.secondary = tk.Toplevel()
        self.app = Secondary(self.secondary)

    def add_user(self):
        dialogoEnterName = simpledialog.askstring("Agregar Usuario", "Ingrese el nombre del usuario")
        if dialogoEnterName is not None:
            print("El nombre del usuario es: ", dialogoEnterName)
            getData(dialogoEnterName)
            print("Usuario agregado")
    
    def train(self):
        training()
        print("Entrenamiento completado")

    def login(self):
        reconocimiento()
        

tt = Principal(tk.Tk())

tt.root.mainloop()