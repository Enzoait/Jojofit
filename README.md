# Jojofit

## Setup

### Etape 1

 - Installer l'extension vscode [Android iOS Emulator](https://marketplace.visualstudio.com/items?itemName=DiemasMichiels.emulate)
 - Cliquer sur l'engrenage une fois l'extenstion installée et cliquer sur "Extension Settings"
 - Dans les paramètres de l'extension, trouver le paramètre Emulator Path for Windows et entrer le chemain suivant, en remplacant {utilisateur} par le nom d'utilisateur de votre PC : 

 ```
 C:\Users\{utilisateur}\AppData\Local\Android\Sdk\emulator
 ```
 - Démarrer une émulateur Android depuis Android Studio
 - Cliquer sur la barre de recherche en haut de vscode et entrer la commande suivante 
 ```
 >Emulator
 ```
 - Appuyer 2 fois sure "Entrée", puis séléctionner l'emulateur android affiché
 - L'Emulateur devrait démarrer dans une nouvelle fenêtre.

### Etape 2 : 

```sh
cd JojoFit
```

```shell
npx expo start
```
 - Une fois que le serveur à démarré, appuyer sur la touche "a" pour lancer l'application sur l'emulateur
