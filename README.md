# Use case : Google Cloud Platform
Ce use case Google Cloud Platform consiste en recréer ce schéma fonctionnel, le but étant qu'une Cloud Function se réveille sur dépôt de fichier, lise le fichier, le transforme en message Pub/Sub, lue par une autre function, qui déverse dans BigQuery.

![Capture](https://user-images.githubusercontent.com/47597491/159738844-88d6f8d0-5551-47d1-9f9a-efe58b58890b.PNG)

## publishPubSub
Cette fonction publie un message dans un topic Google Pub/Sub contenant les données d'un fichier CSV transformé en JSON.

Pour la deployer sur Google Cloud Functions, entrez cette commande :
> gcloud functions deploy publishMessageOnFileUpload_ldi --runtime nodejs16 --trigger-resource *nom_de_mon_bucket* --trigger-event google.storage.object.finalize

## insertBigQuery
Cette fonction écoute les messages publiés dans un topic et insère les données envoyées par publishPubSub dans une base de données BigQuery

Pour la deployer sur Google Cloud Functions, entrez cette commande :
> gcloud functions deploy insertRowsFromPubSubMessage_ldi --runtime nodejs16 --trigger-topic *nom_de_mon_topic*
