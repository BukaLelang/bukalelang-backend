var EmailTemplate = require('email-templates').EmailTemplate
var path = require('path')

let emailSender = require('./emailSender')

var templateDir = path.join(__dirname, 'email-templates', 'testing')
console.log('0--------', templateDir);

var testing = new EmailTemplate(templateDir)
var user = {name: 'Diky', auction: {
   success: true,
   message: 'Success load list of auctions',
    id: 23,
    productId: '31fsa21',
    title: 'Tamiya super cepat',
    images: 'https://s1.bukalapak.com/img/6626679021/large/13335540_1748161672066785_8938462743476190986_n.png',
    category: 'Mainan',
    new: false,
    weight: 1000,
    description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',
    min_price: 200000,
    max_price: 3000000,
    current_price: 600000,
    kelipatan_bid: 20000,
    start_date: '2017-04-16T18:22:54.846+07:00',
    end_date: '2017-05-16T18:22:54.846+07:00'
}}
testing.render(user, function (err, result) {
  if (err) {
    console.log('EROOOR : ', err);
  }
  console.log('result.html', result.html);
  // result.html
  emailSender.testEmail('Diky Arga', 'dikyarga.id@gmail.com', result.html)
  // result.text
})
