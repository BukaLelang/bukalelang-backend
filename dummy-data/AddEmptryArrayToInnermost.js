let fs = require('fs')
let _ = require('lodash')

let readFile = fs.readFileSync('dummy-data/categories.json').toString()
let categoriesJson = JSON.parse(readFile)

let result = categoriesJson

let categoriesLength = categoriesJson.categories.length
console.log('dapet :', categoriesLength);
let summer = 0
for (var i = 0; i < categoriesLength; i++) {


  console.log('punya childre ::: ', categoriesJson.categories[i].children);

  // console.log('isinya apa ya : ', categoriesJson.categories[i].children);
  for (var j= 0; j < categoriesJson.categories[i].children.length; j++) {
    // console.log('=============+', categoriesJson.categories[i].children[j].children);
    if ( categoriesJson.categories[i].children[j].children == undefined) {
      result.categories[i].children[j].children = []
    } else {
      for (var k = 0; k < categoriesJson.categories[i].children[j].children.length; k++) {
        result.categories[i].children[j].children[k].children = []

      }
    }
  }

}
console.log(result.length);


// fs.writeFileSync('dummy-data/categories-converted.json', JSON.stringify(result))

for (var i = 0; i < result.length; i++) {
  delete result[i].updatedAt
  delete result[i].createdAt
}
fs.writeFileSync('dummy-data/categories-converted-for-mobile-add-empty-array.json', JSON.stringify(result))
