# BACK-ShopMyArticle
## Comment installer le back-end ?
- Si vous ne l'avez pas fait, vous pouvez cloner le repo pour initier votre application : `git clone https://github.com/IT-Mehdi/BACK-ShopMyArticle.git`
- Installation des dépendances et démarrage du boilerplate :
```shell
cd BACK-ShopmyArticle # (ou le nom donné au répertoire de votre projet)
npm i # (equivalent de npm install)
npm start
```

## Utilisation de dotEnv
- Attention pour utiliser notre Application vous devez spécifier les données relatives à Stripe
- Pour se faire, vous devez créer un fichier .env à la racine du repository et y mettre les données suivantes
```shell
STRIPE_VERSION=<version>
STRIPE_WEEBHOOK_KEY=<hook>
STRIPE_KEY=<private key>
```

## Comment utiliser le back-end ?

- Il faut d'abord démarrer le back-end
- Puis il faut démarer le front-end que vous trouvez à cette adresse -> https://github.com/IT-Mehdi/FRONT-ShopMyArticle