// Here is my script that will cause some errors

var sumNumbers = require('./stacktrace-sumNumbers.js')

var a = 15
var b = 30

var x = 1
var y = 2

sumNumbers(a, b, handleResponse)

sumNumbers(x, y, handleResponse)

function handleResponse (err, result) {
  if (err) {
    throw new Error(err)
  }
}