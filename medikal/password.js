const bcrypt = require('bcryptjs');

// Hash'leme işlemi
const saltRounds = 10;
const plainPassword = 'irmak2534';  // Buraya kendi belirlediğin admin şifresini yaz

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Hashlenmiş şifre:', hash); // Hashlenmiş şifreyi buradan al ve veritabanına koy
});
