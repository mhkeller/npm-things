var zero = 0
var one = 1
var two = 2

function blahblah () {
  
}

function blahblah2 () {

}

function sumNumbers (x, y, cb) {
  var err = null
  var sum = x + y
  if (sum < 10) {
    err = 'oh no!'
  }
  cb(err, sum)
}

module.exports = sumNumbers