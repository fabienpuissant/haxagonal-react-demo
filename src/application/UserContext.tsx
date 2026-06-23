import { createContext, useContext, type ReactNode } from 'react';
import type { UserRepository } from '../domain/UserRepository';

const UserRepositoryContext = createContext<UserRepository | null>(null);

interface Props {
  repository: UserRepository;
  children: ReactNode;
}

export function UserRepositoryProvider({ repository, children }: Props) {
  return (
    <UserRepositoryContext.Provider value={repository}>
      {children}
    </UserRepositoryContext.Provider>
  );
}

export function useUserRepository(): UserRepository {
  const repository = useContext(UserRepositoryContext);
  if (repository === null) {
    throw new Error('useUserRepository doit être utilisé dans un <UserRepositoryProvider>.');
  }
  return repository;
}
