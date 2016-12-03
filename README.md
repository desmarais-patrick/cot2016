# extreme-quiz

## API
### Spec:
 /nextQuestion?answer=<Int> answer est optionnel. Possibilité d'ajouter &timoutdisabled=true pour debugger sans revenir au début

```javascript
 response:
{
    "previousError":bool, //Indique que la question précédente n'a pas bien été répondue. Affichez un message au FE
    "previousTimeout":bool, //Indique que la question précédente a pris trop de temps à répondre. Affichez un message au FE.
    "question":String, //La question à répondre
    "choice1":String, //Le premier choix de réponse
    "choice2":String //Le 2ieme choix de réponse
} 
```

### Exemple:
http://localhost:3000/nextQuestion?answer=2
```javascript
{
    "previousError":true, 
    "question":"De quelle couleur est la banane ?",
    "choice1":"jaune",
    "choice2":"bleu"
}
```


### Todos:
Quelle genre de réponse on retourne lorsqu'on a répondu à toutes les questions ?
Quelle genre de réponse on retourne lorsqu'on a plus de temps pour compléter le jeux et on doit passer au suivant ?
Inclure les questions à Julien
Ajouter des nouvelles questions
Ajouter p-e du random si on a du temps
Rendre le code plus beau, car fait vite (pas très grave)

## Procédure d'ajout de questions:
1. Ajoutez vos questions dans le csv.
2. Utilisez le site http://www.csvjson.com/csv2json pour convertir en Json

Notes: 
* Les gens devront choisir la mauvaise réponse lors du quiz ce qui sera mélangeant. Cependant dans la colonne answer, nous écrirons la vrai réponse, car on validera avec ça.
* La colonne choice3 servira d'alternative à l'autre mauvaise réponse pour qu'ils soient plus mélangé, s'ils se trompent et doivent revenir au début.
