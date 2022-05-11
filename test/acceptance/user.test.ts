import { Api } from './utils/api';

const userId = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474';
const notExistUser = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a473';
const url = '/user-managements/v1/users';

describe('User routes (Given all tests were running on initial seeding data)', () => {
  describe('Get user details', () => {
    test('Should fail request if id param was not valid uuid', () => {
      return Api.get(`${url}/invalid-id`)
        .expect(400)
        .then((response) => {
          expect(response.body.message).toEqual('user_id param must be a valid uuid-v4!');
        });
    });

    test('Should fail if user not found', () => {
      return Api.get(`${url}/${notExistUser}`)
        .expect(404)
        .then((response) => {
          expect(response.body.message).toEqual(`Could not find user with id ${notExistUser}`);
        });
    });

    test('Should successfully return user details', () => {
      return Api.get(`${url}/${userId}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual({
            company_name: 'pleo',
            first_name: 'Jeppe',
            id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
            last_name: 'Rindom',
          });
        });
    });
  });
});
