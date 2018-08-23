const path = require('path');
const app = require(path.resolve(__dirname, '../server/server'));
const ds = app.datasources.asteriskDb;

ds.automigrate('users', err => {
  if (err) throw err;

  const users = [
    {
      email: 'lokh.ivan@ibm.com',
      phone: '0501111222',
      fio: 'Lokh Ivan Fedorovich',
      address: 'm. Dnipro, v. Lenina 23',
      createdAt: new Date(),
      lastModifiedAt: new Date()
    },
    {
      email: 'john.doe@ibm.com',
      phone: '0501112222',
      fio: 'Doe John Ololoevich',
      address: 'm. Dnipro, v. Lenina 24',
      createdAt: new Date(),
      lastModifiedAt: new Date()
    }
  ];

  let count = users.length;

  users.forEach(user => {
    app.models.users.create(user, (err, model) => {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
      process.exit(0);
    });
  });
});
