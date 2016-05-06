// Here is my script that will cause some errors

var sumNumbers = require('./stacktrace-lib.js')

var a = 15
var b = 30

var x = 1
var y = 2

sumNumbers(a, b, function (err, result) {
  if (err) {
    throw new Error(err)
  }
})


sumNumbers(x, y, function (err, result) {
  if (err) {
    throw new Error(err)
  }
})
