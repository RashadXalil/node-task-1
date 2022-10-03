const axios = require('axios')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/products', async (req, res) => {
  try {
    const result = await axios('https://northwind.vercel.app/api/products')
    res.send(result.data)
  } catch (err) {
    res.json(err.message)
  }
})

app.get(`/products/:id`, async (req, res) => {
  let id = req.params.id
  try {
    const result = await axios(
      `https://northwind.vercel.app/api/products/${id}`,
    )
    res.send(result.data)
  } catch (err) {
    res.json(err.message)
  }
})

app.delete(`/products/:id`, async (req, res) => {
  let id = req.params.id
  try {
    const result = await axios.delete(
      `https://northwind.vercel.app/api/products/${id}`,
    )
    res.json('deleted !')
  } catch (e) {
    res.json(e.message)
  }
})

app.post('/add', async (req, res) => {
  try {
    const result = req.body
    const a = await axios.post(
      'https://northwind.vercel.app/api/products',
      result,
    )
    return res.json(201)
  } catch (e) {
    console.log()
    return res.json(e.message)
  }
})

app.listen(8080, () => {
  console.log('Server running on Port 8080')
})
