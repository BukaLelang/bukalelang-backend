let fs = require('fs')
let readFile = fs.readFileSync('dummy-data/categories.json').toString()
let categoriesJson = JSON.parse(readFile)

let result = []

let categoriesLength = categoriesJson.categories.length
console.log('dapet :', categoriesLength);
let summer = 0
for (var i = 0; i < categoriesLength; i++) {
  console.log('punya childre ::: ', categoriesJson.categories[i].children);
  // console.log('isinya apa ya : ', categoriesJson.categories[i].children);
  for (var j= 0; j < categoriesJson.categories[i].children.length; j++) {
    console.log('=======================+', categoriesJson.categories[i].children[j].children);
    if ( categoriesJson.categories[i].children[j].children == undefined) {

      result.push({
        id: categoriesJson.categories[i].children[j].id,
        bl_categoryId:categoriesJson.categories[i].children[j].id,
        name:categoriesJson.categories[i].children[j].name,
        url:categoriesJson.categories[i].children[j].url,
        createdAt:new Date(),
        updatedAt: new Date()
      })
    } else {
      for(var k = 0; k < categoriesJson.categories[i].children[j].children.length; k++) {
        result.push({
          id: categoriesJson.categories[i].children[j].children[k].id,
          bl_categoryId:categoriesJson.categories[i].children[j].children[k].id,
          name:categoriesJson.categories[i].children[j].children[k].name,
          url:categoriesJson.categories[i].children[j].children[k].url,
          createdAt:new Date(),
          updatedAt: new Date()
        })
      }
    }
  }

}
console.log(result.length);


fs.writeFileSync('dummy-data/categories-converted.json', JSON.stringify(result))
