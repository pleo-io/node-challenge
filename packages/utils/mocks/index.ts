const userExpenses = [
  {
    merchant_name: 'Cafe 22',
    amount_in_cents: 8000,
    currency: 'DKK',
    user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
    date_created: '2021-09-21T19:57:40.021Z',
    status: 'pending',
  },
  {
    merchant_name: 'Sliders',
    amount_in_cents: 12000,
    currency: 'DKK',
    user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
    date_created: '2021-09-20T19:57:40.021Z',
    status: 'processed',
  },
  {
    merchant_name: 'Donkey Republic',
    amount_in_cents: 6000,
    currency: 'DKK',
    user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
    date_created: '2021-09-19T19:57:40.021Z',
    status: 'processed',
  },
];

const paginationResponse = {
  pageInfo: {
    total: 3,
    currentPage: 1,
    totalPages: 2,
  },
  'Table Name': [
    {
      merchant_name: 'Cafe 22',
      amount_in_cents: 8000,
      currency: 'DKK',
      user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
      date_created: '2021-09-21T19:57:40.021Z',
      status: 'pending',
    },
    {
      merchant_name: 'Sliders',
      amount_in_cents: 12000,
      currency: 'DKK',
      user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
      date_created: '2021-09-20T19:57:40.021Z',
      status: 'processed',
    },
    {
      merchant_name: 'Donkey Republic',
      amount_in_cents: 6000,
      currency: 'DKK',
      user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
      date_created: '2021-09-19T19:57:40.021Z',
      status: 'processed',
    },
  ],
};

export { userExpenses, paginationResponse };
