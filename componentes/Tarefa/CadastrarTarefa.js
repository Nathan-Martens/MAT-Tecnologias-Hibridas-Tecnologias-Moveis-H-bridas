import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { StyleSheet, ScrollView, Text, TextInput, View } from "react-native";
import api from "../../service/api";

export default function CadastrarTarefa({navigation}) {
    const [ titulo, setTitulo ] = useState();
    const [ descricao, setDescricao ] = useState();
    const [ responsavel, setResponsavel ] = useState();

    const cadastrar = async ()=>{
        if(!titulo.trim() || !descricao.trim() || !responsavel.trim()){
            Alert.alert("Atenção","Os campos são obrigatórios!");
            console.log("Os campos são obrigatórios!");
            return;
        }

        try{
            
            await api.post("/tarefa", {titulo, descricao, responsavel});

            console.log("Sucesso");

            Alert.alert("Sucesso", "Tarefa cadastrada com sucesso!",[
                {text:"OK", onPress:()=>navigation.goBack()}
            ]);
        }catch(error){
            Alert.alert("Erro", "Erro ao cadastrar a tarefa!!!");
            console.log("Erro ao cadastrar a tarefa!!!", error.response.data.mensagem);
        }
    }
    return (
        <View style={estilo.container}>
            <View style={estilo.todo}>
                <View style={estilo.topo}>
                    <Text style={estilo.textoTopo}>Nova Tarefa</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={estilo.cadastrarTarefa}>
                <View style={estilo.itemLista}>
                    <Text style={estilo.rotulo}>Título da tarefa</Text>
                    <TextInput
                        value={titulo}
                        onChangeText={setTitulo}
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Descrição:</Text>
                    <TextInput
                        value={descricao}
                        onChangeText={setDescricao}
                        multiline={true}
                        numberOfLines={4}
                        style={estilo.inputDescricao}
                    />

                    <Text style={estilo.rotulo}>Responsável:</Text>
                    <TextInput
                        value={responsavel}
                        onChangeText={setResponsavel}
                        style={estilo.input}
                    />
                    <View style={estilo.acao}>
                        <TouchableOpacity    
                            onPress={cadastrar}        
                            style={estilo.botaoSalvar}
                        >
                            <Text style={estilo.textoBotao}>Salvar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f7',
    },

    todo: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },

    topo: {
        width: '100%',
        height: 80,
        backgroundColor: '#2563eb',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },

    textoTopo: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    cadastrarTarefa: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    itemLista: {
        width: '100%',
        height:400,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,

        borderWidth: 1,
        borderColor: '#e0e0e0',

        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    rotulo: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 8,
    },

    input:{
        fontSize: 15,
        borderWidth:1,
        borderColor:'#000000',
        borderRadius: 7,
        height: 40,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom:10
    },
    inputDescricao:{
        fontSize: 15,
        borderWidth:1,
        borderColor:'#000000',
        borderRadius: 7,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom:10
    },
    acao:{
        width: '100%',
        minHeight: 45,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        marginTop: 5,
    },
    botaoSalvar: {
        flex: 1,
        height: 50,
        width: 130,
        marginBottom: 10,
        backgroundColor: '#025e37',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBotao: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
})