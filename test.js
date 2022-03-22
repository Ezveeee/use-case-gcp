const a = '[{ "id": "1711", "nom": "DEPOBOIS", "date_creation": "2000-01-01", "date_fermeture": "2005-08-27", "pays": "FR", "adresse": "10 avenue de l\'Europe", "code_postal": "60280", "ville": "VENETTE" }, { "id": "1712", "nom": "DEPOBOIS", "date_creation": "2000-01-01", "date_fermeture": "2005-08-27", "pays": "FR", "adresse": "10 avenue de l\'Europe", "code_postal": "60280", "ville": "VENETTE" }]';
const b = JSON.parse(a);

console.log(typeof(a));
console.log(a);
console.log();

console.log(typeof(b));
console.log(b);
console.log();

console.log(b[1].id);