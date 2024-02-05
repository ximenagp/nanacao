import cafes from "./cafes.json"
import express from "express"
const app = express()
const PORT = 3000

app.listen(PORT, console.log(`servidor encendido en el puerto: ${PORT}`))

app.use(express.json())

app.get("/cafes", (req, res) => {
  res.status(200).send(cafes)
})

app.get("/cafes/:id", (req, res) => {
  try {
    const cafe = cafes.find((c) => c.id === Number(req.params.id))
    if (!cafe) {
      res.status(404).json({ message: "café no encontrado, inténtalo nuevamente" })
    } else {
      res.status(200).json(cafe)
    }
  } catch (error) {
    console.error("Error en la función /cafes/:id (GET)", error)
    res.status(500).json({ message: "Hubo un error en el servidor" })
  }
})


app.post("/cafes", (req, res) => {
  try {
    const { id } = req.body
    if (cafes.some((cafe) => cafe.id === id)) {
      return res.status(400).json({ message: "este café ya existe" })
    }
    cafes.push(req.body)
    return res.status(201).json(cafes)
  } catch (error) {
    console.error("Error en la función /cafes (POST)", error)
    return res.status(500).json({ message: "Hubo un error en el servidor" })
  }
})


app.put("/cafes/:id", (req, res) => {
  try {
    if (req.params.id !== req.body.id) {
      return res.status(400).json({ message: "ingresa el id correcto" })
    }
    res.status(200).json({ message: "Actualización exitosa" })
  } catch (error) {
    console.error("Error en la función /cafes/:id (PUT)", error)
    res.status(500).json({ message: "Hubo un error en el servidor" })
  }
})

try {
    const cafeIndex = cafes.findIndex(p => p.id === id)
    if (cafeIndex !== -1) {
        cafes[cafeIndex] = cafe
        res.json(cafes)
    } else {
        throw new Error()
    }
} catch {
    res.status(404).json({ message: "No se encontró el café solicitado" })
}

app.delete("/cafes/:id", async (req, res) => {
  const jwt = req.header("Authorization")
  const { id } = req.params
  if (!jwt) return res.status(400).json({ message: "token no encontrado " })
  try {
    const cafeIndexFound = cafes.findIndex(cafe => cafe.id === id)
    if (cafeIndexFound === -1) return res.status(404).json({ message: "no se encontró el café" })
    cafes.splice(cafeIndexFound, 1)
    res.json(cafes)
  } catch (error) {
    console.error("Error en la función /cafes/:id", error)
    res.status(500).json({ message: "Hubo un error en el servidor" })
  }
})


app.use("*", (req, res) => {
    res.status(404).send({ message: "La ruta existe" })
  })

  /*const close = (req, res) => {
    for (const socket of Array.from(sockets)) {
      socket.destroy();
      sockets.delete(socket);
    }
  app.server.close((err) => {
      if(err){
          console.error(err);
          res.status(500).send('el servidor no se pudo cerrar');
      } else {
          res.send('Server closed');
      }
  });
  }*/
  
  export default app