import { Text, View, StyleSheet } from "react-native";
import React, { useState } from 'react';

function ListarTarefa({ route }) {
    
    const itemRota = route.params;

    const [item, setItem] = useState(itemRota.item);

    return (
        <View>
            <Text>Listando a Tarefa </Text>
            <Text>Número da Tarefa: {item.id}</Text>
            <Text style={estilo.titulo}>{item.titulo}</Text>
            <Text style={estilo.descricao}>{item.descricao}</Text>
            <Text style={estilo.responsavel}>Responsável: {item.responsavel.nome}</Text>
            <View>
                <Text style={estilo.data}>Criado em: {item.data_criacao}</Text>
                <Text style={estilo.data}>Atualizado em: {item.data_atualizacao}</Text>
                <Text style={estilo.status}>Status: {item.status}</Text>
            </View>
        </View>
    )
}
const estilo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2e2e2',
        justifyContent: 'top',
        alignItems: 'center'
    },
    topo: {},
    textoTopo: {},
    listaTarefas: {
        width: '90%',
        backgroundColor: '#ebc5c5',
        alignItems: 'center',
    },
    itemLista: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'black',
        width: '95%',
        paddingLeft: 10,
        paddingBottom: 10,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 5,
    },
    descricao: {},
    responsavel: {},
    data: {},
    status: {},
})


export default ListarTarefa;