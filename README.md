# Tidsbanken

## SWE

Tidsbankens syfte är att vara ett system för hantering av anställdas semesteransökningar. Några huvudfunktioner för användare är:

- Att kunna se alla godkända semesteransökningar.
- Att själv kunna ansöka om semester och uppdatera sin ansökan.
- Att se sin ansökningshistorik.

För administratörer finns funktionerna:

- Att kunna registrera nya användare och uppdatera användare.
- Att se alla ansökningar oberoende av status.
- Att kunna uppdatera och radera ansökningar.
- Att uppdatera maximalt antal dagar man kan ansöka om semester.

Förutom adminfunktioner har administratörer tillgång till alla funktioner som användare har (dvs. ansöka om semester och se sin historik). Användare har också en profil där de kan uppdatera sin email och lösenord.

Projektets frontend är gjord i TypeScript med React och Vite. Det är baserat på Bootstraps komponentbibliotek med en responsiv mobile-first design.

Backenden är gjord i C# ASP.NET enligt MVC-mönstret och kan testas via Swagger i browsern. Projektet använder JWT för sessionshantering, PostgreSQL som databas och har Docker-filer.

## ENG

The purpose of Tidsbanken is to be a system for managing employee vacation requests. Some key features for users include:

- The ability to view all approved vacation requests.
- The ability to apply for vacation themselves and update their application.
- The ability to see their application history.

For administrators, the features include:

- The ability to register new users and update users.
- The ability to see all applications regardless of status.
- The ability to update and delete applications.
- The ability to update the maximum number of days one can apply for vacation.

In addition to admin functions, administrators have access to all the features that users have (i.e., applying for vacation and viewing their history). Users also have a profile where they can update their email and password.

The project's frontend is made with TypeScript using React and Vite. It is based on Bootstrap's component library with a responsive mobile-first design.

The backend is made in C# ASP.NET following the MVC pattern and can be tested via Swagger in the browser. The project uses JWT for session management, PostgreSQL as the database, and includes Docker files.
