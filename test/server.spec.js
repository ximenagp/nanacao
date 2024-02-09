import request from "supertest"
import server from "../src/server"

describe("Get ../cafes", () => {
    it("debe responder con un estado 200", async () => {
        const { status } = await request(server).get("/cafes")
        expect(status).toBe(200)
    })
})
    it("devuelve un array", async () => {
        const { body } = await request(server).get("/cafes")
        expect(Array.isArray(body)).toBe(true)
    })
    describe("given an id", () => {
        const cafeId = "given id"
        it("responde un estado 404", async () => {
            const response = await request(server).get(`/cafes/${cafeId}`)
            expect(response.status).toBe(404)
        })  
    })

  describe("Post ../cafes", () => {
      const newCoffe = {
          name: "other coffe"
      };
      let response, id, postResponse
  
      beforeAll(async () => {
          response = await request(index).post("/cafes").send(newCoffe);
          id = response.body.id;
          postResponse = await request(index).post(`/cafes/${id}`).send({ name:"new coffe" })
      })
  
      it("devuelve un código 201", () => {
          expect(response.status).toBe(201)
      })
  
      it("agrega un nuevo café", () => {
          expect(postResponse.body.name).toBe("new coffe")
      })
  })

describe("Put ../cafes/:id", () => {
    it("devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.", async() => {
        const newCoffe = { name: "other coffee" }
        const response = await request(server).post("/cafes").send(newCoffe)
        const updateCoffe = { name: "new coffee" }
        const putResponse = await request(server).put(`/cafes/${!response.body.id}`).send(updateCoffe)
        expect(putResponse.status).toBe(400)
    })
})
