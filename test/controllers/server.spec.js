import request from "supertest"
import app from "../../server.js.js"
import { generateToken } from "../utils/login"
import { generateFakeId } from "../utils/id.js"

describe("CRUD operations for cafes", () => {
  it("devuelve un estado 200", async () => {
    const response = await request(app).get("/cafes")
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it("crea un elemento (café) devuolviendo un estado 201", async () => {
    let id = generateFakeId()
    const nuevoCafe = {
      id: id,
      nombre: "Cortado",
    }
    const response = await request(app).post("/cafes").send(nuevoCafe)
    expect(response.status).toBe(201)
  })

  it("si intenta actualizar un id no coincidente", async () => {
    let id = generateFakeId()
    const cafesResponse = await request(app).get("/cafes")
    const cafeToUpdate = cafesResponse.body[0]
    const updatedCafe = {
      id: id,
      nombre: "tostado",
    }
    const response = await request(app)
      .put(`/cafes/${cafeToUpdate.id}`)
      .send(updatedCafe)
    expect(response.statusCode).toBe(400)
  })

  it(" id does not exist delete ", async () => {
    let id = generateFakeId()
    id = id
    const response = await request(app)
      .delete(`/cafes/${id}`)
      .set("Authorization", generateToken())
    expect(response.statusCode).toBe(404)
  })
})
