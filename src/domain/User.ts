export interface User {
  readonly id: string;
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly company: string;
  readonly city: string;
}


export function userInitials(user: User): string {
  return user.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('');
}


export function searchUsers(users: readonly User[], query: string): User[] {
  const q = query.trim().toLowerCase();
  if (q === '') return [...users];

  return users.filter((user) =>
    [user.name, user.username, user.company].some((field) =>
      field.toLowerCase().includes(q),
    ),
  );
}
