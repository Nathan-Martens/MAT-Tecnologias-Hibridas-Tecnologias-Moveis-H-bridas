import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import api from '../../service/api';


function EditarResponsavel({ route, navigation }) {
    const id = route.params.responsavel.id;

    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [foto, setFoto] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [status, setStatus] = useState("");
    const [funcao, setFuncao] = useState("");
    const [cargo, setCargo] = useState("");

    const buscarResponsavel = async () => {
        try {
            const resposta = await api.get(`/responsavel/${id}`);
            // aceita { responsavel: {...} } ou o objeto direto
            const respResponsavel = resposta.data.responsavel ?? resposta.data;

            setNome(respResponsavel.nome);
            setTelefone(respResponsavel.telefone);
            setFoto(respResponsavel.foto);
            setEmail(respResponsavel.email);
            setStatus(respResponsavel.status);
            setFuncao(respResponsavel.funcao);
            setCargo(respResponsavel.cargo);
            // a senha não é preenchida: fica em branco para manter a atual
        } catch (error) {
            Alert.alert("Erro", "Não foi possível buscar os dados do responsável.");
            console.log("Erro ao buscar responsável: " + error.response.data.erro);
        }
        //implementar o finaly
    }

    useEffect(() => {
        buscarResponsavel();
    }, []);

    const atualizar = async () => {
        if (!nome.trim() || !telefone.trim() || !foto.trim() || !email.trim() || !status.trim() || !funcao.trim() || !cargo.trim()) {
            Alert.alert("Atenção", "Os campos são obrigatórios!");
            console.log("Os campos são obrigatórios!");
            return;
        }

        try {
            const dados = { nome, telefone, foto, email, status, funcao, cargo };

            // só envia a senha se o usuário digitou uma nova
            if (senha.trim()) {
                dados.senha = senha;
            }

            await api.put(`/responsavel/${id}`, dados);

            console.log("Sucesso");

            Alert.alert("Sucesso", "Responsável atualizado com sucesso!", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert("Erro", "Erro ao atualizar o responsável!");
            console.log("Erro ao atualizar o responsável!", error.response?.data?.mensagem ?? error.message);
        }
    }

    return (
        <View style={estilo.container}>
            <View style={estilo.topo}>
                <Text style={estilo.textoTopo}>Editar Responsável</Text>
            </View>
            <ScrollView contentContainerStyle={estilo.cadastrarResponsavel}>
                <View style={estilo.responsavelLista}>
                    <Text style={estilo.rotulo}>Nome:</Text>
                    <TextInput
                        value={nome}
                        onChangeText={setNome}
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Telefone:</Text>
                    <TextInput
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="phone-pad"
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Foto:</Text>
                    <TextInput
                        value={foto}
                        onChangeText={setFoto}
                        autoCapitalize="none"
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Email:</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Nova senha:</Text>
                    <TextInput
                        value={senha}
                        onChangeText={setSenha}
                        placeholder="Deixe em branco para manter a atual"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Status:</Text>
                    <TextInput
                        value={status}
                        onChangeText={setStatus}
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Função:</Text>
                    <TextInput
                        value={funcao}
                        onChangeText={setFuncao}
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Cargo:</Text>
                    <TextInput
                        value={cargo}
                        onChangeText={setCargo}
                        style={estilo.input}
                    />

                    <View style={estilo.acao}>
                        <TouchableOpacity
                            onPress={atualizar}
                            style={estilo.botaoSalvar}
                        >
                            <Text style={estilo.textoBotao}>Atualizar</Text>
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

    cadastrarResponsavel: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 12,
        alignItems: 'center',
    },

    responsavelLista: {
        width: '100%',
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

    input: {
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 7,
        height: 40,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 10,
    },

    acao: {
        width: '100%',
        minHeight: 45,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
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

export default EditarResponsavel;
{/*
import React, {useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, TextInput, View } from "react-native";
import api from "../../service/api";

function EditarResponsavel({ route }) {
    const id = route.params.id;

    const [responsavel, setResponsavel] = useState([]);

    const [nome, setNome] = useState();
    const [telefone, setTelefone] = useState();
    const [foto, setFoto] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [status, setStatus] = useState();
    const [funcao, setFuncao] = useState();
    const [cargo, setCargo] = useState();

    const buscarResponsavel = async () => {
        try {
            const response = await api.get(`/responsavel/${id}`);
            setResponsavel(response.data);
            setNome(response.data.nome);
            setTelefone(response.data.telefone);
            setFoto(response.data.foto);
            setEmail(response.data.email);
            setSenha(response.data.senha);
            setStatus(response.data.status);
            setFuncao(response.data.funcao);
            setCargo(response.data.cargo);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível buscar os dados do responsável.");
            console.log("Erro ao buscar responsável:", error.response.data.mensagem);
        }
    }

    useEffect(() => {
        buscarResponsavel();
    }, []);

    const EditarResponsavel = async ({route}) => {
        if (!nome.trim() || !telefone.trim() || !foto.trim() || !email.trim() || !senha.trim() || !status.trim() || !funcao.trim() || !cargo.trim()) {
            Alert.alert("Atenção", "Todos os campos são obrigatórios!");
            console.log("Todos os campos são obrigatórios!");
            return;
        }

        try {
            await api.put(`/responsavel/${id}`, { nome, telefone, foto, email, senha, status, funcao, cargo });

            console.log("Responsável editado com sucesso!");

            Alert.alert("Sucesso", "Responsável editado com sucesso!", [{ text: "OK", onPress: () => navigation.goBack() }]);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível editar o responsável.");
            console.log("Erro ao editar responsável:", error.response.data.mensagem);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    value={telefone}
                    onChangeText={setTelefone}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Foto"
                    value={foto}
                    onChangeText={setFoto}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={senha}
                    onChangeText={setSenha}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Status"
                    value={status}
                    onChangeText={setStatus}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Função"
                    value={funcao}
                    onChangeText={setFuncao}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cargo"
                    value={cargo}
                    onChangeText={setCargo}
                />
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
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
        height: 400,
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
    
    input: {
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 7,
        height: 40,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 10
    },
    inputDescricao: {
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 7,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 10
    },
    acao: {
        width: '100%',
        minHeight: 45,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
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

export default EditarResponsavel;
*/}