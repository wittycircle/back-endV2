const Validator = require('express-validator')

module.exports = Validator({
  customValidators: {
    isArray: function (value) {
      return Array.isArray(value)
    },
    isString: function (value) {
      return typeof value === 'string'
    },
    min: function (param, num) {
      if (typeof param === 'string') {
        return param.length >= num
      } else {
        return param >= num
      }
    },
    max: function (param, num) {
      if (typeof param === 'string') {
        return param.length <= num
      } else {
        return param <= num
      }
    },
    isEmail: function (email) {
      const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      return re.test(email)
    },
    isUnique: function (value, collum, table) {
      return true
      pool.query('SELECT `id` FROM `' + table + '` WHERE `' + collum + '` = ?', [value],
                function (err, rows, fields) {
                  if (err) throw err
                  return rows.length === 0
                })
    },
    isLoggedUser: function (value, elem) {
      return value === elem.session.user_id
    }
  },
  customSanitizers: {
    Clean: function (value, nice) {
      if (typeof value === 'string') {
        if (typeof nice !== 'undefined' && nice === true) {
          return value.trim().replace(/(<([^>]+)>)/ig, '').Nice()
        } else {
          return value.trim().replace(/(<([^>]+)>)/ig, '')
        }
      } else {
        return value
      }
    },
    Nice: function (value) {
      return value.charAt(0).toUpperCase() + value.substring(1).toLowerCase()
    }
  }
})
