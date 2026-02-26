const http = require('http')

const urls = process.argv.slice(2)
const results = []
let completed = 0

function collect(index) {
  http.get(urls[index], function (response) {

    response.setEncoding('utf8')

    let data = ''

    response.on('data', function (chunk) {
      data += chunk
    })

    response.on('end', function () {
      results[index] = data
      completed++

      if (completed === urls.length) {
        results.forEach(result => console.log(result))
      }
    })

  })
}

for (let i = 0; i < urls.length; i++) {
  collect(i)
}