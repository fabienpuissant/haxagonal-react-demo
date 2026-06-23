import { useMemo } from 'react';
import { UserRepositoryProvider } from './application/UserContext';
import { SearchBar } from './infrastructure/primary/SearchBar';
import { UserList } from './infrastructure/primary/UserList';
import { HttpUserRepository } from './infrastructure/secondary/HttpUserRepository';
import { useUsers } from './application/useUsers';


function UsersScreen() {
  const { users, status, error, query, setQuery, reload } = useUsers();

  return (
    <main className="app">
      <header className="app__header">
        <h1>Annuaire</h1>
        <p className="app__subtitle">React · architecture hexagonale</p>
      </header>

      <SearchBar value={query} onChange={setQuery} />

      <UserList
        users={users}
        isLoading={status === 'loading'}
        error={error}
        onRetry={reload}
      />
    </main>
  );
}

export default function App() {
  const userRepository = useMemo(() => new HttpUserRepository(), []);

  return (
    <UserRepositoryProvider repository={userRepository}>
      <UsersScreen />
    </UserRepositoryProvider>
  );
}
