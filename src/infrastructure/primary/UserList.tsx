import type { User } from '../../domain/User';
import { UserCard } from './UserCard';

interface Props {
  users: User[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function UserList({ users, isLoading, error, onRetry }: Props) {
  if (isLoading) {
    return <p className="state state--loading">Chargement des utilisateurs…</p>;
  }

  if (error) {
    return (
      <div className="state state--error">
        <p>{error}</p>
        <button className="retry" onClick={onRetry}>
          Réessayer
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    return <p className="state state--empty">Aucun utilisateur ne correspond.</p>;
  }

  return (
    <div className="user-grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
