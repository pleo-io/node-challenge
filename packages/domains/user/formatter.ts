import { User } from './types';
import { capitalize } from "@nc/utils/capitalize";

const publicFields = ['first_name', 'last_name', 'company_name'];


export function secureTrim(user: User): string {
  return JSON.stringify(user, publicFields);
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
