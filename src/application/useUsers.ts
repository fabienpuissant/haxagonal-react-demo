import { useCallback, useEffect, useMemo, useState } from 'react';
import { useUserRepository } from './UserContext';
import { searchUsers, User } from '../domain/User';

type Status = 'idle' | 'loading' | 'success' | 'error';

export interface UsersViewModel {
  users: User[];
  status: Status;
  error: string | null;
  query: string;
  setQuery: (value: string) => void;
  reload: () => void;
}

export function useUsers(): UsersViewModel {
  const repository = useUserRepository();

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const result = await repository.findAll();
      setAllUsers(result);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setStatus('error');
    }
  }, [repository]);

  useEffect(() => {
    void load();
  }, [load]);

  const users = useMemo(() => searchUsers(allUsers, query), [allUsers, query]);

  return { users, status, error, query, setQuery, reload: load };
}
