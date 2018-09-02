const path = require('path');
const app = require(path.resolve(__dirname, '../server/server'));
const ds = app.datasources.mikbillDb;

ds.automigrate('users', err => {
  if (err) throw err;

  const users = [
    {
      email: 'lokh.ivan@ibm.com',
      phone: '0501111222',
      fio: 'Lokh Ivan Fedorovich',
      address: 'm. Dnipro, v. Lenina 23',
      debit: 100,
      credit: 0,
      createdAt: new Date(),
      lastModifiedAt: new Date()
    },
    {
      email: 'john.doe@ibm.com',
      phone: '0501112222',
      fio: 'Doe John Ololoevich',
      address: 'm. Dnipro, v. Lenina 24',
      debit: 0,
      credit: 100,
      createdAt: new Date(),
      lastModifiedAt: new Date()
    }
  ];

  let count = users.length;

  users.forEach((user, index) => {
    app.models.users.create(user, (err, model) => {
      if (err) throw err;

      console.log('Created:', model);

      if (index === count - 1 ) {
        ds.disconnect();
      }
    });
  });
});
