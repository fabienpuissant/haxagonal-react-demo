# Annuaire — React en architecture hexagonale

Mini-démo : une app React + TypeScript qui récupère des utilisateurs depuis
[JSONPlaceholder](https://jsonplaceholder.typicode.com/users) (API de test publique),
avec recherche, le tout structuré en **architecture hexagonale (ports & adapters)**.

## Démarrer

```bash
npm install
npm run dev
```

## La règle d'or : les dépendances pointent vers le centre

```
   INFRA PRIMAIRE                              INFRA SECONDAIRE
   (composants React)                          (HTTP, repositories)
         │                                            │
         │   props / callbacks          implémente    │
         ▼                                  ▲          ▼
   ┌─────────────────── APPLICATION ───────┼──────────────┐
   │   hooks · context · injection de dép.  │              │
   │                    │                   │              │
   │                    ▼                   │              │
   │            ┌──────────────── DOMAIN ───┴───┐          │
   │            │  types · règles métier        │          │
   │            │  PORT (UserRepository) ───────┼──────────┘
   │            └───────────────────────────────┘
   └────────────────────────────────────────────┘

   Le DOMAIN ne dépend de RIEN.
   L'APPLICATION dépend du domaine.
   Les deux INFRAS dépendent de l'intérieur (jamais l'inverse).
```

## Les couches

### `src/domain` — le cœur
Types métier (`User`) et **règles pures** (`searchUsers`, `userInitials`).
Définit aussi le **port** `UserRepository` : un contrat « j'ai besoin de users »,
sans savoir d'où ils viennent. Zéro dépendance externe, testable sans rien monter.

### `src/application` — la glue
- `UserContext` : injection de dépendances. On fournit une implémentation du port
  au reste de l'app via un Context React.
- `useUsers` : le cas d'usage. Orchestre l'état React + le port + les règles du domaine.
  **Aucun `fetch` ici**, **aucune règle réimplémentée** — il appelle le domaine.

### `src/infrastructure/primary` — adapter d'entrée
Composants React **purs** (`UserList`, `UserCard`, `SearchBar`). Ils reçoivent
données et callbacks de l'application et dessinent. Pas d'I/O, pas d'état métier.

### `src/infrastructure/secondary` — adapter de sortie
`HttpUserRepository` **implémente le port** du domaine. C'est le seul endroit qui
connaît JSONPlaceholder. Mapping anti-corruption `UserDto → User` : la forme brute
de l'API ne fuit jamais dans le reste de l'app.
