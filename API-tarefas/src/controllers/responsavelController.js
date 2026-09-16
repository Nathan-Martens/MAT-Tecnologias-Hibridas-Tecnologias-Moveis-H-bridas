
const dbTarefa = require("../../mook/BaseTarefas.js");

const listarResponsaveis = (req, res)=>{
    return res.status(200).json({
        sucesso: true,
        dados: dbTarefa
        }
    )
}

module.exports = {
    listarResponsaveis
}