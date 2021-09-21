const publicFields = ['first_name', 'last_name', 'company_name'];

export function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

export function secureTrim(user) {
    return JSON.stringify(user, publicFields);
}

export function format(rawUser) {
    return {
        id: rawUser.id,
        first_name: capitalize(rawUser.first_name),
        last_name: capitalize(rawUser.last_name),
        company_name: rawUser.company_name,
        ssn: rawUser.ssn,
    };
}
