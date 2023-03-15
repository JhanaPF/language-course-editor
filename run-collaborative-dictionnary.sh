#!/bin/bash
# gnome-terminal package is needed to start the project 


# Lancer le premier terminal avec l'application 1 dans le dossier /chemin/vers/dossier1
gnome-terminal --tab --title="Back-end" --working-directory="$PWD/back-end" -e "bash -c 'sudo systemctl start mongod; npm start; exec bash'"

# Lancer le deuxième terminal avec l'application 2 dans le dossier /chemin/vers/dossier2
gnome-terminal --tab --title="Dashboard" --working-directory="$PWD/dashboard" -e "bash -c 'npm start; exec bash'"
