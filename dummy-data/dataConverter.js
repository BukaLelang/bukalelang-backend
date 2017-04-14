let fs = require('fs')
let readFile = fs.readFileSync('dummy-data/categories.json').toString()
let categoriesJson = JSON.parse(readFile)

let result = []

let categoriesLength = categoriesJson.categories.length
console.log('dapet :', categoriesLength);

for (var i = 0; i < categoriesLength; i++) {
  result.push({
    bl_categoryId:categoriesJson.categories[i].id,
    name:categoriesJson.categories[i].name,
    url:categoriesJson.categories[i].url,
    createdAt:new Date(),
    updatedAt: new Date()
  })
}
console.log(result);


fs.writeFileSync('dummy-data/categories-converted.json', JSON.stringify(result))
