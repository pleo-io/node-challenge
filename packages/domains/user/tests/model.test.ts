import { getUserDetails } from '../model';

describe('[Packages | User-domain] getUserDetails', () => {
  test('should return a users detail', async () => {
    const result = await getUserDetails('e17825a6-ad80-41bb-a76b-c5ee17b2f29d');
    expect(result?.first_name).toBe('Petr');
    expect(result?.last_name).toBe('Janda');
    expect(result?.company_name).toBe('pleo');
    expect(result?.ssn).toBe('2');
  });
});
