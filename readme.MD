Daniels inlämning av TypeScript Express API

######
Instruktioner för att köra projektet.
1. cd expressapi
2. npm i -D @types/node
3. npm run build
4. npm start
#####

Krav för godkänt:
1. Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs) [X]
2. Samtliga endpoints skall kunna nås via en REST Client fil (.rest|.http) [X]
3. Datan som API:et hanterar sparas lokalt i serverfilen [X]
4. APIét ska svara med 404 om datan saknas. [X]
5. Git & GitHub har använts[X]
6. Projektmappen innehåller en README.md fil - (läs ovan för mer info)[X]
7. Uppgiften lämnas in i tid!

Krav för väl godkänt: 
1. Alla punkter för godkänt är uppfyllda [X]
2. All data skall vara sparad i en JSON-fil istället för i serverfilen [X]
3. Datan i JSON-filen skall uppdateras då något läggs till, uppdateras eller tas bort [X]
4. Ett klient-gränssnitt skall byggas för att anropa API:ets alla olika endpoints och 
presentera datan, redigeringsformulär skall fyllas i med befintlig information. 
5. Ytterligare en GET endpoint skall läggas till där det går att hämta ett specifikt objekt [X]

#####
I mappen "expressapi" hittar du tsconfig och den jsonfil som används.
#####
I "src" mappen hittar du server.ts/server.js samt server.rest
#####
Daniel Josefsson 
#####