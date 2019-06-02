//// DavidViajes
//// 123viajes

module.exports = {
  development : {
      dialect : 'mysql',
      username: 'DavidViajes',
      password: '123viajes',
      database: 'viajesajes',
      host:'localhost'
  },
  test : {
    dialect:'mysql',
    storage: ':memory;'
  }
}