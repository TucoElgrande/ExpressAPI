npm i express typescript @types/express @types/node nodemon ts-node

1. Kör npm run build
2. npm run start
3.npm i -D @types/node

joi


source.addMissingImports, "source

package.json   // "main": "index.js",

Krav för godkänt:
1. Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs) [X]
2. Samtliga endpoints skall kunna nås via en REST Client fil (.rest|.http) [X]
3. Datan som API:et hanterar sparas lokalt i serverfilen
4. APIét ska svara med 404 om datan saknas. [X]
5. Git & GitHub har använts[X]
6. Projektmappen innehåller en README.md fil - (läs ovan för mer info)[X]
7. Uppgiften lämnas in i tid!

Krav för väl godkänt:
1. Alla punkter för godkänt är uppfyllda
2. All data skall vara sparad i en JSON-fil istället för i serverfilen
3. Datan i JSON-filen skall uppdateras då något läggs till, uppdateras eller tas bort
4. Ett klient-gränssnitt skall byggas för att anropa API:ets alla olika endpoints och
presentera datan, redigeringsformulär skall fyllas i med befintlig information.
5. Ytterligare en GET endpoint skall läggas till där det går att hämta ett specifikt objekt [X]