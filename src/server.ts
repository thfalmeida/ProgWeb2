import express, { Request, Response } from 'express';


const app = express();
const port = 3000;

let currentId = 0;
const pets = [
    {
        id: 0,
        nome: "Au au",
        idade: "23",
        raça: "vira-lata"
    }
];


app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});


app.get("/pets/", (req: Request, res:Response) => {
    res.json(pets);
})

app.get("/pets/:id", (req: Request, res:Response) => {
    const petId = pets.findIndex(i => i.id == parseInt(req.params.id))
    if(petId !== -1){
        res.json(pets[petId]);
    }else{
        res.status(204).send("Pet não encontrado :(")
    }
})

app.post("/pets/", (req: Request, res: Response) => {
    const {nome, idade, raça} = req.body;
    const actualId = ++currentId;
    const pet = {id: actualId, nome, idade, raça};

    pets.push(pet);
    res.status(201).json(pets[actualId])
})

app.delete("/pets/:id", (req: Request, res:Response) => {
    const pet = pets.findIndex(i => i.id == parseInt(req.params.id))
    if(pet === -1)
        res.status(404).json("Pet não encontrado :(")

    else{
        pets.slice(pet, 1);
        res.status(201).json("Pet deletado com sucesso!");
    }
})

app.put("pets/:id", (req: Request, res:Response) => {
    const pet = pets.findIndex(i => i.id == parseInt(req.params.id))
    if(pet === -1)
        res.status(400).json("Pet não encontrado!")

    else{
        const { nome, idade, raça } = req.body;
        pets[pet] = { id: parseInt(req.params.id), nome, idade, raça };
        res.status(201).json(pets[pet])
    }
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

