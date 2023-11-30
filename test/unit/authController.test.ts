import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { signup } from "../../src/app/controllers/authController";
import supertest from "supertest"
const app = require("../../src/index").default;

let mongoServer: MongoMemoryServer
describe('handler', () => {
  let testResult1 
//   let testResult2


  beforeAll(async() => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    mongoose
    .connect(uri, {dbName: 'credit'})
    .then(() => {
      console.log('Connected Successfully.')
    })

    console.log('Test Data Saved Successfully.')
    jest.setTimeout(10*1500)
  }, 15000)

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
  })

  describe('authTest', () => {
    it('should return a successful signup', async () => {
    const createUser = {  
     name:"Denis",
    phone_number:"07059436335",
    email: "ajkshines01111@gmail.com",
    password: "123456000"
}
 await supertest(app)
.post("/v1/api/signup")
.send(createUser)
.set('Accept', 'application/json')
.expect(201)
.expect((res:any) => {
    expect(res.body.message).toBe('User created successfully')
})

    });

    it('should login successfully', async () => {
    const sampleData = {  
    email: "ajkshines01111@gmail.com",
    password: "123456000"
}
 await supertest(app)
.post("/v1/api/signin")
.send(sampleData)
.set('Accept', 'application/json')
.expect(200)
.expect((res:any) => {
    expect(res.body.message).toBe('Login successful')
})
    });

    it('should logout a user', async () => {

    const sampleData = {  
    email: "ajkshines01111@gmail.com",
    password: "123456000"
}
 await supertest(app)
.post("/v1/api/logout")
.send(sampleData)
.set('Accept', 'application/json')
.expect(200)
.expect((res:any) => {
    expect(res.body.message).toBe('You have successfully logged out')
})
      
    });
  });

})
