const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
var prodId = 1
class Product {
  constructor(
    name,
    brandId,
    catergoryId,
    desc,
    discountPercent,
    salePrice,
    image,
  ) {
    ;(this.id = prodId),
      (this.name = name),
      (this.brandId = brandId),
      (this.catergoryId = catergoryId),
      (this.desc = desc),
      (this.discountPercent = discountPercent),
      (this.salePrice = salePrice),
      (this.image = image),
      (this.isDeleted = false)
    prodId++
  }
}
let Products = [
  {
    id: 1,
    name: 'ras',
    brandId: 1,
    catergoryId: 2,
    desc: 'salam salm salam',
    discountPercent: 10,
    salePrice: 2100,
    isDeleted: false,
  },
]
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send({ Products, Brands, Categories })
})
// Products Crud
app.get('/products', (req, res) => {
  res.send(Products)
})
//get by id
app.get('/products/:id', (req, res) => {
  let id = req.params.id
  let target = Products.find((x) => x.id == id)
  res.send(target)
})
// Products add
app.post('/products', upload.single('image'), (req, res) => {
  const fileName = req.file != null ? req.file.filename : null
  let prod = new Product(
    req.body.name,
    req.body.brandId,
    req.body.catergoryId,
    req.body.desc,
    req.body.discountPercent,
    req.body.salePrice,
    fileName,
  )
  Products.push(prod)
  res.send(Products)
})
//products delete
app.delete('/products/:id', (req, res) => {
  let id = req.params.id
  let target = Products.find((x) => x.id == id)
  let indexOfTarget = Products.indexOf(target)
  Products.splice(indexOfTarget, 1)
  res.send('Item Deleted !')
})
//product edit
app.put('/products/:id', (req, res) => {
  let id = req.params.id
  let product

  if (!id) return res.send('Please provide id blin')

  Products = Products.map((product) => {
    if (product.id == id) {
      const upd = {
        ...product,
        ...req.body,
      }
      product = upd
      return upd
    }
    return product
  })

  res.send(product)
})
app.listen(8080, () => {
  console.log('Server running on 8080')
})
