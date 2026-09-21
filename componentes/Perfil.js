import { useEffect, useState } from "react";
import {ActivityIndicator,ScrollView, StyleSheet, Text, TouchableOpacity,View,} from "react-native";

/* ------------------------------------------------------------------ */
/* Configuração                                                        */
/* ------------------------------------------------------------------ */

// true  = usa os dados simulados abaixo (não precisa de servidor)
// false = busca em `${API_URL}/responsavel/${ID_LOGADO}`
const USAR_DADOS_SIMULADOS = true;

// No emulador Android, "localhost" do computador é 10.0.2.2.
// No iOS Simulator use http://localhost:3000.
// No celular físico use o IP da sua máquina na rede (ex.: http://192.168.0.10:3000).
const API_URL = "http://10.0.2.2:3000";

// Enquanto não existe login, o "usuário logado" é fixo.
const ID_LOGADO = 1;

const RESPONSAVEL_SIMULADO = {
    id: 1,
    nome: "Mariana Alves Ferreira",
    parentesco: "Mãe",
    email: "mariana.ferreira@email.com",
    telefone: "(44) 99876-5432",
    cpf: "123.456.789-09",
    dataNascimento: "1986-04-17",
    endereco: {
        rua: "Av. Colombo",
        numero: "1500",
        bairro: "Zona 7",
        cidade: "Maringá",
        uf: "PR",
        cep: "87020-000",
    },
    dependentes: [
        { id: 10, nome: "Lucas Ferreira" },
        { id: 11, nome: "Helena Ferreira" },
    ],
};

/* ------------------------------------------------------------------ */
/* Acesso aos dados                                                    */
/* ------------------------------------------------------------------ */

async function buscarResponsavel(id) {
    if (USAR_DADOS_SIMULADOS) {
        // Pequena espera para dar para ver o estado de carregamento.
        await new Promise((resolve) => setTimeout(resolve, 600));
        return RESPONSAVEL_SIMULADO;
    }

    const resposta = await fetch(`${API_URL}/responsavel/${id}`);
    if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status} ao buscar o responsável`);
    }
    return resposta.json();
}

/* ------------------------------------------------------------------ */
/* Funções de formatação                                               */
/* ------------------------------------------------------------------ */

function iniciais(nome = "") {
    const partes = nome.trim().split(/\s+/).filter(Boolean);
    if (partes.length === 0) return "?";
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

// "1986-04-17" -> "17/04/1986" (sem passar por Date, para evitar erro de fuso)
function formatarData(iso) {
    if (!iso) return "";
    const [ano, mes, dia] = iso.slice(0, 10).split("-");
    return `${dia}/${mes}/${ano}`;
}

function formatarEndereco(endereco) {
    if (!endereco) return { linha1: "", linha2: "" };
    const linha1 = [
        [endereco.rua, endereco.numero].filter(Boolean).join(", "),
        endereco.bairro,
    ]
        .filter(Boolean)
        .join(" - ");
    const linha2 = [
        [endereco.cidade, endereco.uf].filter(Boolean).join(" - "),
        endereco.cep && `CEP ${endereco.cep}`,
    ]
        .filter(Boolean)
        .join(", ");
    return { linha1, linha2 };
}

/* ------------------------------------------------------------------ */
/* Peças de interface                                                  */
/* ------------------------------------------------------------------ */

function Secao({ titulo, children }) {
    return (
        <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>{titulo}</Text>
            {children}
        </View>
    );
}

function Campo({ rotulo, valor, ultimo }) {
    return (
        <View style={[styles.campo, !ultimo && styles.campoDivisor]}>
            <Text style={styles.rotulo}>{rotulo}</Text>
            <Text style={styles.valor}>{valor || "Não informado"}</Text>
        </View>
    );
}

/* ------------------------------------------------------------------ */
/* Componente principal                                                */
/* ------------------------------------------------------------------ */

function Perfil() {
    const [responsavel, setResponsavel] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [tentativa, setTentativa] = useState(0);

    useEffect(() => {
        let ativo = true;

        async function carregar() {
            setCarregando(true);
            setErro(null);
            try {
                const dados = await buscarResponsavel(ID_LOGADO);
                if (ativo) setResponsavel(dados);
            } catch (e) {
                if (ativo) {
                    setErro(
                        "Não foi possível carregar o perfil. Verifique sua conexão e tente novamente."
                    );
                }
            } finally {
                if (ativo) setCarregando(false);
            }
        }

        carregar();

        // Evita atualizar o estado se a tela for fechada durante a busca.
        return () => {
            ativo = false;
        };
    }, [tentativa]);

    if (carregando) {
        return (
            <View style={styles.centralizado}>
                <ActivityIndicator size="large" color={cores.primaria} />
                <Text style={styles.mensagem}>Carregando perfil...</Text>
            </View>
        );
    }

    if (erro || !responsavel) {
        return (
            <View style={styles.centralizado}>
                <Text style={styles.mensagem}>{erro}</Text>
                <TouchableOpacity
                    style={styles.botao}
                    onPress={() => setTentativa((n) => n + 1)}
                    accessibilityRole="button"
                >
                    <Text style={styles.botaoTexto}>Tentar novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const { linha1, linha2 } = formatarEndereco(responsavel.endereco);
    const dependentes = responsavel.dependentes || [];

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.conteudo}
        >
            <View style={styles.cabecalho}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarTexto}>
                        {iniciais(responsavel.nome)}
                    </Text>
                </View>
                <Text style={styles.nome}>{responsavel.nome}</Text>
                {!!responsavel.parentesco && (
                    <Text style={styles.parentesco}>
                        {responsavel.parentesco}
                    </Text>
                )}
            </View>

            <Secao titulo="Contato">
                <Campo rotulo="E-mail" valor={responsavel.email} />
                <Campo rotulo="Telefone" valor={responsavel.telefone} ultimo />
            </Secao>

            <Secao titulo="Dados pessoais">
                <Campo rotulo="CPF" valor={responsavel.cpf} />
                <Campo
                    rotulo="Data de nascimento"
                    valor={formatarData(responsavel.dataNascimento)}
                    ultimo
                />
            </Secao>

            <Secao titulo="Endereço">
                <View style={styles.campo}>
                    <Text style={styles.valor}>
                        {linha1 || "Não informado"}
                    </Text>
                    {!!linha2 && <Text style={styles.valorSecundario}>{linha2}</Text>}
                </View>
            </Secao>

            {dependentes.length > 0 && (
                <Secao titulo="Dependentes">
                    {dependentes.map((dep, i) => (
                        <View
                            key={dep.id}
                            style={[
                                styles.dependente,
                                i < dependentes.length - 1 && styles.campoDivisor,
                            ]}
                        >
                            <View style={styles.dependenteInicial}>
                                <Text style={styles.dependenteInicialTexto}>
                                    {iniciais(dep.nome)}
                                </Text>
                            </View>
                            <Text style={styles.valor}>{dep.nome}</Text>
                        </View>
                    ))}
                </Secao>
            )}
        </ScrollView>
    );
}

/* ------------------------------------------------------------------ */
/* Estilos                                                             */
/* ------------------------------------------------------------------ */

const cores = {
    primaria: "#17495B",
    destaque: "#F2C879",
    fundo: "#F3F5F7",
    superficie: "#FFFFFF",
    texto: "#1B2A33",
    textoSuave: "#64737D",
    linha: "#E1E6EA",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.fundo,
    },
    conteudo: {
        paddingBottom: 32,
    },
    centralizado: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backgroundColor: cores.fundo,
    },
    mensagem: {
        marginTop: 12,
        fontSize: 15,
        lineHeight: 22,
        color: cores.textoSuave,
        textAlign: "center",
    },
    botao: {
        marginTop: 16,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: cores.primaria,
    },
    botaoTexto: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
    },

    cabecalho: {
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 32,
        paddingHorizontal: 24,
        backgroundColor: cores.primaria,
    },
    avatar: {
        width: 88,
        height: 88,
        borderRadius: 44,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: cores.destaque,
    },
    avatarTexto: {
        fontSize: 32,
        fontWeight: "700",
        color: cores.primaria,
    },
    nome: {
        marginTop: 16,
        fontSize: 22,
        fontWeight: "700",
        color: "#FFFFFF",
        textAlign: "center",
    },
    parentesco: {
        marginTop: 4,
        fontSize: 15,
        color: "#BFD3DB",
    },

    secao: {
        marginTop: 20,
        marginHorizontal: 16,
    },
    secaoTitulo: {
        marginBottom: 8,
        marginLeft: 4,
        fontSize: 15,
        fontWeight: "700",
        color: cores.textoSuave,
    },
    campo: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: cores.superficie,
    },
    campoDivisor: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: cores.linha,
    },
    rotulo: {
        marginBottom: 2,
        fontSize: 13,
        color: cores.textoSuave,
    },
    valor: {
        fontSize: 16,
        color: cores.texto,
    },
    valorSecundario: {
        marginTop: 2,
        fontSize: 14,
        color: cores.textoSuave,
    },

    dependente: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: cores.superficie,
    },
    dependenteInicial: {
        width: 32,
        height: 32,
        marginRight: 12,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: cores.fundo,
    },
    dependenteInicialTexto: {
        fontSize: 12,
        fontWeight: "700",
        color: cores.primaria,
    },
});

export default Perfil;