import { User } from './types';

const publicFields = ['first_name', 'last_name', 'company_name'];

export function capitalize(word) {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}

export function redactSensitiveFields(user: User): Pick<User, 'first_name' | 'last_name' | 'company_name'> {
  return JSON.parse(JSON.stringify(user, publicFields));
}

export function format(rawUser): User {
  return {
    id: rawUser.id,
    first_name: capitalize(rawUser.first_name),
    last_name: capitalize(rawUser.last_name),
    company_name: rawUser.company_name,
    ssn: rawUser.ssn,
  };
}
