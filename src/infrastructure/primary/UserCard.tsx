import { userInitials, type User } from '../../domain/User';

interface Props {
  user: User;
}

export function UserCard({ user }: Props) {
  return (
    <article className="user-card">
      <div className="user-card__avatar" aria-hidden>
        {userInitials(user)}
      </div>
      <div className="user-card__body">
        <h3 className="user-card__name">{user.name}</h3>
        <p className="user-card__meta">@{user.username} · {user.city}</p>
        <p className="user-card__company">{user.company}</p>
        <a className="user-card__email" href={`mailto:${user.email}`}>
          {user.email}
        </a>
      </div>
    </article>
  );
}
