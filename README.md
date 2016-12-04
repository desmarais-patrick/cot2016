# cot2016

Chasse aux trésors 2016.

## API

### Structure:

Le fichier `app.js` est le fichier central du serveur.

On y retrouve:
* Les routes pour nos quatre épreuves.
* Deux variables globales: `global.donnees`, `global.routeur`.

#### Où est-ce qu'on met nos données pour les épreuves?

Toutes les données applicatives des épreuves se trouvent dans `global.donnees`.

Chaque épreuve définit ses données dans le fichier .js associé qui se trouve
sous le dossier `routes`.

Par exemple, le sous-ensemble de données pour `questionnaire` se trouve sous
l'objet `global.donnees.questionnaire`.

#### Pour ajouter une nouvelle route...

Le routeur Express est maintenant contenu dans `global.routeur`. Pour ajouter
des routes, vous devez vous servir de cet objet.

Par épreuve, assurez-vous que toutes les routes sont uniques.

### Spec:

#### Route `questionnaire/`

 `/questionnaire/nextQuestion?answer=<Int>`

 * *answer* est optionnel.
 * Possibilité d'ajouter `&timoutdisabled=true` pour déboguer sans revenir au début.


```javascript
 response:
{
    "previousError":bool, //Indique que la question précédente n'a pas bien été répondue. Afficher un message au FE.
    "previousTimeout":bool, //Indique que la question précédente a pris trop de temps à répondre. Afficher un message au FE.
    "question":String, //La question à répondre.
    "choice1":String, //Le premier choix de réponse.
    "choice2":String //Le 2ieme choix de réponse.
}
```

### Exemple:

 `/questionnaire/nextQuestion?answer=2

```javascript
{
    "previousError":true,
    "question":"De quelle couleur est la banane?",
    "choice1":"jaune",
    "choice2":"bleu"
}
```


### Todos:

Le tout semble fonctionnel, il reste seulement ceci à compléter:

- Quelle genre de réponse on retourne lorsqu'on a répondu à toutes les questions ?
- Quelle genre de réponse on retourne lorsqu'on a plus de temps pour compléter le jeu et on doit passer au suivant ?
- Inclure les questions à Julien.
- Ajouter de nouvelles questions.
- Ajouter peut-être du *random*, si on a du temps.
- Rendre le code plus beau, car fait vite (pas très grave).


## Procédure d'ajout de questions:

1. Ajoutez vos questions dans le csv.
2. Utilisez le site http://www.csvjson.com/csv2json pour convertir en Json

### Notes:

* Les gens devront choisir la mauvaise réponse lors du quiz, ce qui sera mélangeant. Cependant, dans la colonne *answer*, nous écrirons la vrai réponse, car on validera avec ça.
* La colonne *choice3* servira d'alternative à l'autre mauvaise réponse, pour qu'ils soient plus mélangé. S'ils se trompent, ils doivent revenir au début.
