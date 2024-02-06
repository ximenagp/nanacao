import request from "supertest"
import app from "../server.js"
import { generateToken } from "../scr/utils/login.js"
import { generateFakeId } from "../scr/utils/id.js"

describe("CRUD operations for cafes", () => {
    it("should return a status of 200", async () => {
    const response = await (await request(app).get("/cafes")).send()
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

  it("crea un elemento (café) devuolviendo un estado 201", async () => {
    const { id } = response.body
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
