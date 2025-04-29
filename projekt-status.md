# 📊 Clima-App Projekt Status

## 📋 Oversigt

Dette dokument sammenligner vores Clima-app projekt med målpinde-checklisten for at vurdere projektets aktuelle status. Projektet har en solid implementering af objektorienteret programmering, moderne web UI med Next.js/React, databasehåndtering med Prisma ORM og versionsstyring med Git.

## ✅ Afsluttede Målpinde (30/76)

### 💻 Objektorienteret Programmering

- ✅ 1. Anvendelse af objektorienteret programmeringssprog (TypeScript/JavaScript)
      - https://github.com/Best-Company-A-S/office-clima-app/blob/main/app/(dashboard)/updates/page.tsx#L10-L25
- ✅ 2. Grundlæggende viden om det valgte programmeringssprog/framework (Next.js, React)
- ✅ 3. Definition og design af egne klasser
- ✅ 4. Erklæring og instantiering af objekter
- ✅ 5. Anvendelse af collections
- ✅ 6. Anvendelse af kodestandard (TypeScript standard)
- ✅ 7. Håndtering af exception handling
- ✅ 8. Redegørelse for OOP konceptet såsom indkapsling, polymorfi og arv
- ✅ 9. Udarbejdelse af applikation som gør brug af OOP konceptet
- ✅ 15. Udarbejdelse af UML klassediagrammer (findes i docs/plan.md)
- ✅ 16. Design af simpel domænemodel baseret på best practice (implementeret i Prisma schema)

### 🗄️ Databaser

- ✅ 53. Udarbejdelse af avanceret databasedesign og anvendelse af SQL syntaxen og ORM
- ✅ 54. Anvendelse af SELECT til forespørgsler mod en tabel
- ✅ 55. Anvendelse af INSERT, UPDATE, DELETE til manipulation af tabel
- ✅ 56. Oprettelse, redigering og sletning af tabeller samt dokumentation med E/R-diagram
- ✅ 57. Anvendelse af relationstyper 1:mange, mange:mange og 1:1 med tilhørende nøgler
- ✅ 58. Implementering af konsistenskrav, referenceintegritet, relationer og constraints
- ✅ 59. Anvendelse af JOIN og SUBQUERIES til forespørgsler fra flere tabeller
- ✅ 60. Oprettelse og sletning af database
- ✅ 69. Normalisering af database (implementeret via Prisma schema)
- ✅ 70. Basal viden om ORM (Object Relational Mapping)
- ✅ 71. Oprettelse af domain-model og lade ORM generere databasen og forespørgsler
- ✅ 72. Anvendelse af færdig database og lade ORM generere domain-modellen

### 🖥️ GUI Programmering

- ✅ 27. GUI-programmering rettet mod webbaserede applikationer, der bygger på SPA
- ✅ 28. Implementering af grafisk brugergrænseflade som understøtter funktionelle krav
- ✅ 29. Anvendelse af forskellige typer af layout containers
- ✅ 30. Udvælgelse og konfigurering af kontroller til at understøtte funktionelle krav
- ✅ 31. Implementering af event-handling
- ✅ 32. Implementering af UI Design pattern
- ✅ 37. Beskrivelse af arkitekturen for Single Page Application (SPA) med fordele/ulemper
- ✅ 38. Udvikling af SPA client vha. frameworks (Next.js)
- ✅ 39. Anvendelse og konfiguration af komponenter, moduler og services i frameworks
- ✅ 40. Udvikling af SPA client med flere "sider" vha. Routing
- ✅ 41. Udvikling af SPA client, der vha. HTTP kommunikerer asynkront med webservice

### 📝 Versionsstyring & Dokumentation

- ✅ 18. Redegørelse for hvorfor og hvordan man benytter et versionsstyringsværktøj
- ✅ 19. Redegørelse for formålet med udarbejdelse af dokumentation
- ✅ 20. Beherskelse af dokumentation under programudvikling
- ✅ 21. Anvendelse af versionsstyringsværktøj under programudvikling
- ✅ 22. Begrundelse for behovet for dokumentation og brug af versionsstyringsværktøj

## ⚠️ Delvist Afsluttede Målpinde (14/76)

### 💻 Objektorienteret Programmering

- ⚠️ 10. Skelnen mellem override og overload af metoder (delvist brugt i komponenternes props-håndtering)
- ⚠️ 11. Begrundelse for valget af "access modifiers"/virkefelter
- ⚠️ 12. Oprettelse og implementering af selvudviklet interface
- ⚠️ 13. Anvendelse af funktion pointer/callback (delvist via event handlers)
- ⚠️ 14. Oprettelse og anvendelse af generiske klasser og metoder/funktioner
- ⚠️ 17. Redegørelse for betydningen af løs kobling og afhængigheder mellem moduler

### 🔄 Asynkron Programmering

- ⚠️ 23. Udførelse af asynkron programmering (delvist implementeret via React hooks og API kald)
- ⚠️ 26. Redegørelse for muligheder ved anvendelse af anonyme metoder og Lambda metoder

### 🔒 Sikkerhed

- ⚠️ 42. Redegørelse for sikkerhedsmæssige udfordringer ved en SPA løsning
- ⚠️ 43. Debugging af SPA client (via Next.js indbyggede fejlhåndtering)
- ⚠️ 66. Forholdsregler til at imødegå SQL Injection (delvist via Prisma ORM)
- ⚠️ 75. Viden om sikkerhedsproblematikker omkring databaser (via Prisma og Docker-isolation)

### 🗄️ Database Administration

- ⚠️ 63. Redegørelse for baggrunden for konsistenskrav og referenceintegritet
- ⚠️ 76. Grundlæggende viden om metoder til at teste en nyudviklet database

## ❌ Manglende Målpinde (32/76)

### 💻 Objektorienteret Programmering

- ❌ 10\*. Implementering af abstrakte klasser og metoder

### 🔄 Asynkron Programmering

- ❌ 24. Redegørelse for grundlæggende problemstilling med Thread Safety og Atomic State
- ❌ 25. Brug af frameworkets klasser til asynkron programmering med Thread Safety
- ❌ 27\*. Oprettelse af multitrådet applikation og redegørelse for udfordringer med tråde
- ❌ 33. Design, udvikling og anvendelse af "custom-controls"
- ❌ 34. Konfiguration af Application-klassen og dens lifetime-events
- ❌ 35. Implementering af multitrådet applikation

### 🧪 Test & Usability

- ❌ 36. Udførelse af simpel usability-test

### 🔄 Agile Metoder

- ❌ 44. Beskrivelse af grundlæggende elementer i Agile metoder og Agile manifestet
- ❌ 45. Beskrivelse af grundlæggende principper inden for Agile software udvikling
- ❌ 46. Beskrivelse af de mest almindelige redskaber til brug i Agile projekter
- ❌ 47. Beskrivelse af indholdet i Scrums tre roller
- ❌ 48. Beskrivelse af indholdet i Scrums tre ceremonier
- ❌ 49. Beskrivelse af Scrums tre værktøjer
- ❌ 50. Beskrivelse af aktiviteter, teknikker og principper i XP
- ❌ 51. Beskrivelse af principperne omkring Test Driven Development (TDD)
- ❌ 52. Beskrivelse af scenarie for udviklingsopgave med Agile principper

### 🗄️ Avanceret Database Funktionalitet

- ❌ 61. Oprettelse af Views og begrundelse af sikkerhedsaspektet
- ❌ 62. Anvendelse af avancerede SQL-kommandoer
- ❌ 64. Oprettelse, redigering og sletning af Stored Procedures
- ❌ 65. Oprettelse og administration af Triggers
- ❌ 67. Oprettelse og administration af indexes for optimal performance
- ❌ 68. Udførelse af performance-måling på database
- ❌ 73. Grundlæggende viden om DocumentDatabaser
- ❌ 74. Beskrivelse af fordele/ulemper mellem relationel database, ORM og DocumentDatabase
