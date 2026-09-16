require('dotenv').config();
const express = require("express");
const { sequelize } = require('./src/models/index.js');

const cors = require("cors");
const tarefaRoutes = require("./src/routes/tarefaRoutes.js");
const responsavelRoutes = require("./src/routes/responsavelRoutes.js");

const app = new express();
app.use(cors());
app.use(express.json());

app.use("/tarefas", tarefaRoutes);
app.use("/responsaveis", responsavelRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "Seja Bem-Vindo ao Gerenciador de Tarefas"
    });
});

app.use((req, res) => {
    res.status(404).json({
        erro: "Essa Rota não Existe!!!"
    });
});

const port = process.env.PORT || 5000;

async function iniciarServidor() {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco de dados estabelecida com sucesso.")
        
        //await sequelize.sync();
        //await sequelize.sync({alter: true});
        //await sequelize.sync({force: true});

        console.log("Tabelas sincronizadas com sucesso.");
        if (process.env.NODE_ENV !== "production") {
            app.listen(port, () => {
                console.log(`Servidor Rodando no link: http://localhost:${port}`)
            });
        }
    } catch (error) {
        console.log("Não foi possível conectar ao banco de dados:", error)
    }
}

iniciarServidor();
module.exports = app;

//https://dontpad.com/TI-2026

/*const dbTarefa = require("./mook/BaseTarefas.js");
app.get("/tarefas", (req, res) => {
    if (dbTarefa.length > 0) {
        res.status(200).json({
            numeroTarefas: dbTarefa.length,
            dbTarefa
        });
    } else {
        res.status(404).json({
            mensagem: "Lista de Tarefas está vazia!!!"
        })
    }
})

app.get("/tarefa/:id", (req, res) => {
    const idBusca = Number(req.params.id);

    if (isNaN(idBusca)) {
        res.status(400).json({
            erro: "ID Inválido"
        })
    }
    const tarefa = dbTarefa.find((item) => item.id === idBusca);

    if (!tarefa)
        return res.status(404).json({
            idBusca: idBusca,
            erro: "Tarefa não Encontrada"
        })

    return res.status(200).json({
        idBusca: idBusca,
        tarefa
    });
})

app.post("/tarefa", (req, res)=>{
    const {titulo, descricao, responsavel} = req.body;

    if(!titulo || !descricao || !responsavel){
        return res.status(400).json({
            erro: "Todos os campos são Obrigatórios!!!"
        })
    }
    //gerar data atual
    const dataAtual = new Date().toISOString().split('T')[0];
   
    //gerar id com base no id anterior
    const novoId = dbTarefa.length > 0 ? 
    dbTarefa[dbTarefa.length - 1].id + 1 : 1

    const novaTarefa = {
        id: novoId,
        titulo,
        descricao,
        status: 'EM_ANDAMENTO',
        responsavel:{
            id: responsavel?.id || (novoId + 10),
            nome: responsavel?.nome || 'Não Atribuido',
            data_criacao: dataAtual,
            data_atualizacao: dataAtual
        },
        data_criacao: dataAtual,
        data_atualizacao: dataAtual
    }
    dbTarefa.push(novaTarefa);
    return res.status(201).json({
        mensagem: 'Tarefa criada com sucesso!!!',
        tarefa: novaTarefa
    })
})

app.put("/tarefa/:id", (req, res)=>{
    const id = Number(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({
            erro: "ID Inválido"
        })
    }

    const index = dbTarefa.findIndex(t=> t.id === id);

    if (index === -1){
        return res.status(404).json({
            erro: "Tarefa não encontrada!!!"
        })
    }
    const {titulo, descricao, responsavel, status}= req.body;
    const dataAtual = new Date().toISOString().split('T')[0];

    dbTarefa[index]={
        ...dbTarefa[index],
        titulo: titulo || dbTarefa[index].titulo,
        descricao: descricao || dbTarefa[index].descricao,
        status: status || dbTarefa[index].status,
        responsavel: responsavel ? {
            ...dbTarefa[index].responsavel,
            ...responsavel,
            data_atualizacao:dataAtual
        } : dbTarefa[index].responsavel,
        data_atualizacao: dataAtual
    }
    return res.status(200).json({
        mensagem: "Tarefa atualizada com sucesso!!!",
        tarefa: dbTarefa[index]
    })
})

app.delete("/tarefa/:id", (req, res)=>{
    const id = Number(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({
            erro: "ID Inválido"
        })
    }

    const index = dbTarefa.findIndex(t=> t.id === id);

    if (index === -1){
        return res.status(404).json({
            erro: "Tarefa não encontrada!!!"
        })
    }

    const tarefaRemovida = dbTarefa.splice(index, 1);

    return res.status(200).json({
        mensagem: "Tarefa removida com sucesso!!!",
        tarefaRemovida: tarefaRemovida
    })
})
*/