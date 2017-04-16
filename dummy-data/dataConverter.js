let fs = require('fs')
let readFile = fs.readFileSync('dummy-data/categories.json').toString()
let categoriesJson = JSON.parse(readFile)

let result = []

let categoriesLength = categoriesJson.categories.length
console.log('dapet :', categoriesLength);
let summer = 0
for (var i = 0; i < categoriesLength; i++) {
  console.log('isinya apa ya : ', categoriesJson.categories[i].children);
  for (var j= 0; j < categoriesJson.categories[i].children.length; j++) {
    result.push({
      id: categoriesJson.categories[i].children[j].id,
      bl_categoryId:categoriesJson.categories[i].children[j].id,
      name:categoriesJson.categories[i].children[j].name,
      url:categoriesJson.categories[i].children[j].url,
      createdAt:new Date(),
      updatedAt: new Date()
    })
  }
  summer += categoriesJson.categories[i].children.length

}
console.log(summer);


fs.writeFileSync('dummy-data/categories-converted.json', JSON.stringify(result))
