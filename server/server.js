const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');


const MongoDBclient = new MongoClient('mongodb://127.0.0.1:27017')


// ициализация express + cors + bodyParser
const app = express()
app.use(cors())
app.use(bodyParser.json());

const port = 5000

const reTest = async () =>{
    try {
        await MongoDBclient.connect()
        console.log("Успешно подключились к базе данных")
        await MongoDBclient.close()
        console.log("Подключение закрыто")
    } catch (e) {
        console.log(e)
    }
 }
 reTest()


 app.get('/', (req, res) => {
    res.send('success')
  })

app.post('/api/create/person/:uuid', async (req, res) => {
  try {
    await MongoDBclient.connect()
    const exployees = MongoDBclient.db('flfree').collection('persons')
    await exployees.insertOne(req.body)
    res.json(req.body)
  } catch (err) {
      res.status(500).send(err.message);
      console.error(err)
  } finally {
      await MongoDBclient.close()
}
})

app.put('/api/update/person/:uuid', async (req, res) => {
  try {
    await MongoDBclient.connect();
    const exployees = MongoDBclient.db('flfree').collection('persons')
    await exployees.updateOne({ uuid: req.body.uuid}, { $set: { username: req.body.username}})
    res.status(200).send(req.body);
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await MongoDBclient.close()
}
})

app.get('/api/person/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  try {
    await MongoDBclient.connect();
    const exployees = MongoDBclient.db('flfree').collection('persons')
    const filter = { uuid: uuid };
    const person = await exployees.find(filter).toArray();

    res.json(person)

  } catch(err) {
    console.log('Ошибка получения: ' + err);
  } finally {
    console.log('Получено')
    MongoDBclient.close();
  }
})

app.delete('/api/destroy', async (req, res) => {
  try {
    await MongoDBclient.connect();
    const orderbd = MongoDBclient.db('flfree').collection('orders')
    const personsbd = MongoDBclient.db('flfree').collection('persons')
    await orderbd.deleteMany({})
    await personsbd.deleteMany({})
  } catch(err) {
    console.log(err)
  }finally {
    console.log('Удалён документ')
    MongoDBclient.close();
  }
})

app.get('/api/user/orders/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  try {
    await MongoDBclient.connect();
    const exployees = MongoDBclient.db('flfree').collection('orders')
    const filter = { uuid: uuid };
    const allCategories = await exployees.find(filter).toArray();
    res.json(allCategories);
  } catch(err) {
    console.log('Ошибка получения: ' + err);
  } finally {
    console.log('Получено')
    MongoDBclient.close();
  }
})

app.get('/api/order/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await MongoDBclient.connect();
    const exployees = MongoDBclient.db('flfree').collection('orders')
    const filter = { _id: new ObjectId(id) };
    const oneOrder = await exployees.find(filter).toArray();
    res.json(oneOrder);
  } catch(err) {
    console.log('Ошибка получения: ' + err);
  } finally {
    console.log('Получен ордер')
    MongoDBclient.close();
  }
})

app.get('/api/feeds/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    await MongoDBclient.connect();
    const exployees = MongoDBclient.db('flfree').collection('orders');
    const collection = await exployees.find({uuid: { $ne : uuid }, inWork: false}).toArray();
    res.json(collection)
  } catch(err) {
    res.status(500).send(err.message);
    console.log('Ошибка получения feeds: ' + err);
  } finally {
    console.log('ответ получен feeds')
    MongoDBclient.close();
  } 
})

app.delete('/api/order/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await MongoDBclient.connect();
    const exployees = MongoDBclient.db('flfree').collection('orders')
    const filter = { _id: new ObjectId(id) };
    await exployees.deleteOne(filter)
  } catch(err) {
    res.status(500).send(err.message);
    console.log('Ошибка получения: ' + err);
  } finally {
    res.status(200).send("saved");
    MongoDBclient.close();
  }
})

app.post('/api/user/:uuid', async (req, res) => {

    // сохранение юзера в бд
    try {
        await MongoDBclient.connect()
        const exployees = MongoDBclient.db('flfree').collection('orders')
        await exployees.insertOne(req.body)
    } catch (err) {
        res.status(500).send(err.message);
        console.error(err)
    }finally {
        await MongoDBclient.close()
        res.status(200).send("saved");
        
    }
    /*
    try {  
      await MongoDBclient.connect()
      const exployees = MongoDBclient.db('flfree').collection('orders')
      await exployees.insertOne(req.body)
    } catch (err) {
      res.status(500).send("Ошибка записи документа");
      console.error('Ошибка сохранения в БД: ' + err)
    } finally {
        res.status(200).send("saved");
      await MongoDBclient.close()
    }*/

  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })