import { Text, View, StyleSheet } from "react-native";
import React, { useState } from 'react';

function ListarResponsavel({ route }) {

    const responsavelRota = route.params;

    const [responsavel, setResponsavel] = useState(responsavelRota.responsavel);

    return (
        <View>
            <Text>Listando o Responsável </Text>
            <Text>Número do Responsável: {responsavel.id}</Text>
            <Text style={estilo.titulo}>{responsavel.nome}</Text>
            <Text style={estilo.telefone}>Telefone: {responsavel.telefone}</Text>
            <Text style={estilo.email}>Email: {responsavel.email}</Text>
            <Text style={estilo.foto}>Foto: {responsavel.foto}</Text>
            <Text style={estilo.funcao}>Função: {responsavel.funcao}</Text>
            <Text style={estilo.cargo}>Cargo: {responsavel.cargo}</Text>
            <View>
                <Text style={estilo.data}>Criado em: {responsavel.data_criacao}</Text>
                <Text style={estilo.data}>Atualizado em: {responsavel.data_atualizacao}</Text>
                <Text style={estilo.status}>Status: {responsavel.status}</Text>
            </View>
        </View>
    )
}
const estilo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2e2e2',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    topo: {},
    textoTopo: {},
    listaResponsaveis: {
        width: '90%',
        backgroundColor: '#ebc5c5',
        alignItems: 'center',
    },
    responsavelLista: {
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
    telefone: {},
    email: {},
    foto: {},
    funcao: {},
    cargo: {},
    data: {},
    status: {},
})


export default ListarResponsavel;
{/*import { Text, View, StyleSheet } from "react-native";
import React, { useState } from 'react';

function ListarResponsavel({ route }) {

    const responsavelRota = route.params;

    const [responsavel, setResponsavel] = useState(responsavelRota.responsavel);

    return (
        <View>
            <Text>Listando a Responsável </Text>
            <Text>Número da Responsável: {responsavel.id}</Text>
            <Text style={estilo.responsavel}>Responsável: {responsavel.nome}</Text>
            <View>
                <Text style={estilo.data}>Criado em: {responsavel.data_criacao}</Text>
                <Text style={estilo.data}>Atualizado em: {responsavel.data_atualizacao}</Text>
                <Text style={estilo.status}>Status: {responsavel.status}</Text>
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
    responsavelLista: {
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


export default ListarResponsavel;*/}