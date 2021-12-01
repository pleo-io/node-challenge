export default function capitalize(word): string {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}
