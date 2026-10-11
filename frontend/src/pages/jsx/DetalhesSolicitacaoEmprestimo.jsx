import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Alert, Box, Button, Checkbox, Chip, CircularProgress, Dialog, DialogActions,
    DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, Radio,
    RadioGroup, Snackbar, Stack, TextField, Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../../components/jsx/Header";
import Footer from "../../components/jsx/Footer";
import { useEmprestimo } from "../../context/EmprestimoContext";
import { getUsuario, saveUsuario } from "../../utils/auth";
import { capaLivro, enderecoCompleto, enderecoDoUsuario, formatarEndereco, REGRAS_EMPRESTIMO } from "../../utils/solicitacao";
import enderecoIcone from "../../assets/solicitacao/address.png";
import "../css/DetalhesSolicitacaoEmprestimo.css";

const API = "http://localhost:3000";
const CAMPOS_ENDERECO = [
    ["nome", "Nome do endereço", "Ex.: Casa, trabalho"],
    ["cep", "CEP", "00000-000"],
    ["rua", "Rua / Avenida", ""],
    ["numero", "Número", ""],
    ["complemento", "Complemento", "Ex.: casa, apto, bloco"],
    ["bairro", "Bairro", ""],
    ["cidade", "Cidade", ""],
    ["uf", "UF", "PE"],
];

export default function DetalhesSolicitacaoEmprestimo() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { livros: carrinho, setLivros } = useEmprestimo();
    const usuario = getUsuario();
    const userId = localStorage.getItem("user_id") || usuario?.id;
    const ids = Array.isArray(state?.livroIds) && String(state?.userId) === String(userId)
        ? state.livroIds.map(Number) : [];
    const livros = carrinho.filter(livro => ids.includes(Number(livro.id)));
    const [entrega, setEntrega] = useState("delivery");
    const [endereco, setEndereco] = useState(() => enderecoDoUsuario(getUsuario()));
    const [rascunho, setRascunho] = useState(endereco);
    const [modalAberto, setModalAberto] = useState(false);
    const [erroEndereco, setErroEndereco] = useState("");
    const [aceite, setAceite] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const envioEmCurso = useRef(false);
    const hoje = new Date().toLocaleDateString("pt-BR");
    const voltar = () => navigate("/solicitacao-emprestimo", { state: { livroIds: ids } });
    const temEndereco = enderecoCompleto(endereco);
    const regras = REGRAS_EMPRESTIMO;

    function abrirEndereco() {
        setRascunho({ ...endereco });
        setErroEndereco("");
        setModalAberto(true);
    }

    function salvarEndereco(event) {
        event.preventDefault();
        if (!enderecoCompleto(rascunho)) {
            setErroEndereco("Preencha o endereço completo, um CEP válido e a UF com duas letras.");
            return;
        }
        const atual = getUsuario();
        if (!atual || String(atual.id) !== String(userId)) {
            setErroEndereco("Faça login novamente para atualizar seu endereço.");
            return;
        }
        const atualizado = Object.fromEntries(Object.entries(rascunho).map(([campo, valor]) => [campo, valor.trim()]));
        atualizado.uf = atualizado.uf.toUpperCase();
        try {
            // Mantém compatibilidade com PerfilUsuario, que lê endereco como texto.
            saveUsuario({
                ...atual, ...Object.fromEntries(Object.entries(atualizado).filter(([campo]) => campo !== "nome")),
                endereco: formatarEndereco(atualizado),
                enderecoEntrega: { ...atualizado, nomeEndereco: atualizado.nome },
            });
            setEndereco(atualizado);
            setModalAberto(false);
            setFeedback({ severity: "success", message: "Endereço atualizado neste navegador." });
        } catch {
            setErroEndereco("Não foi possível salvar o endereço neste navegador. Tente novamente.");
        }
    }

    async function confirmarSolicitacao() {
        if (envioEmCurso.current || !aceite || !livros.length || (entrega === "delivery" && !temEndereco)) return;
        if (!userId || String(getUsuario()?.id) !== String(userId)) {
            setFeedback({ severity: "error", message: "Faça login para confirmar a solicitação." });
            return;
        }
        envioEmCurso.current = true;
        setEnviando(true);
        setFeedback(null);
        try {
            const { data: exemplares } = await axios.get(`${API}/exemplares`);
            if (!Array.isArray(exemplares)) throw new Error("Não foi possível verificar a disponibilidade.");
            const indisponiveis = livros.filter(livro => !exemplares.some(
                exemplar => Number(exemplar.id_livro) === Number(livro.id) && exemplar.disponivel
            ));
            if (indisponiveis.length) {
                setFeedback({ severity: "error", message: "A disponibilidade mudou. Volte à lista e revise os livros selecionados." });
                return;
            }
            // Contrato já utilizado pela lista. Entrega/endereço aguardam API do backend.
            const { data } = await axios.post(`${API}/emprestimos`, {
                user_id: Number(userId),
                livro_ids: livros.map(livro => Number(livro.id)),
            });
            setLivros(anteriores => anteriores.filter(livro => !ids.includes(Number(livro.id))));
            navigate("/meus-emprestimos", { replace: true, state: { mensagem: data.mensagem } });
        } catch (error) {
            setFeedback({ severity: "error", message: error.response?.data?.mensagem
                ?? "Não foi possível confirmar a solicitação. Tente novamente." });
        } finally {
            envioEmCurso.current = false;
            setEnviando(false);
        }
    }

    return (
        <Box className="detalhes-solicitacao">
            <Header />
            <Box component="main" className="detalhes-main">
                <Typography component="h1" className="detalhes-titulo">Detalhes da solicitação</Typography>
                <Typography className="detalhes-subtitulo">Revise as informações do seu empréstimo antes de confirmar.</Typography>
                {!livros.length ? (
                    <Stack spacing={3} className="detalhes-vazio">
                        <Typography>Nenhum livro selecionado para revisão.</Typography>
                        <Button variant="outlined" onClick={voltar}>Voltar à lista de solicitação</Button>
                    </Stack>
                ) : (
                    <Box className="detalhes-secoes">
                        <Box component="section" aria-labelledby="livros-solicitados">
                            <Typography component="h2" id="livros-solicitados" className="detalhes-secao-titulo">Livros solicitados</Typography>
                            {livros.map(livro => (
                                <Stack key={livro.id} direction="row" className="detalhes-livro">
                                    {capaLivro(livro) ? (
                                        <Box component="img" src={capaLivro(livro)} alt={`Capa de ${livro.titulo}`} className="detalhes-capa" />
                                    ) : <Box className="detalhes-capa detalhes-sem-capa">Sem capa</Box>}
                                    <Stack spacing={1.5} className="detalhes-livro-info">
                                        <Typography component="h3">{livro.titulo}</Typography>
                                        <Typography className="detalhes-autor">{livro.autor}</Typography>
                                        <Typography className="detalhes-genero">Gêneros: <span>{livro.genero || "Não informado"}</span></Typography>
                                        <Chip label="DISPONÍVEL" className="detalhes-disponivel" size="small" />
                                    </Stack>
                                </Stack>
                            ))}
                        </Box>
                        <Divider className="detalhes-divisor" />
                        <Box component="section" aria-labelledby="informacoes-emprestimo">
                            <Typography component="h2" id="informacoes-emprestimo" className="detalhes-secao-titulo">Informações do empréstimo</Typography>
                            <Box className="detalhes-informacoes">
                                {[
                                    ["Data da solicitação", hoje, "hoje"],
                                    ["Previsão de entrega", "A definir", "aguardando definição da biblioteca"],
                                    ["Previsão de devolução", "A definir", regras.prazoDevolucaoDias ? `prazo de ${regras.prazoDevolucaoDias} dias` : "prazo ainda não definido"],
                                    ["Multa por dia de atraso", regras.multaDiariaPorLivro == null ? "A definir" : regras.multaDiariaPorLivro.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }), "por livro"],
                                ].map(([label, valor, descricao]) => (
                                    <Box key={label} className="detalhes-card">
                                        <Typography>{label}</Typography>
                                        <Typography className="detalhes-card-valor">{valor}</Typography>
                                        <Typography className="detalhes-card-descricao">{descricao}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                        <Box component="section" aria-labelledby="forma-entrega">
                            <Typography component="h2" id="forma-entrega" className="detalhes-secao-titulo">Forma de entrega</Typography>
                            <RadioGroup aria-labelledby="forma-entrega" name="forma-entrega" value={entrega}
                                onChange={event => setEntrega(event.target.value)} className="detalhes-entregas">
                                {[
                                    ["delivery", "Delivery", "Receba os livros no seu endereço."],
                                    ["retirada", "Retirada na biblioteca", "Retire os livros direto na biblioteca."],
                                ].map(([valor, titulo, descricao]) => (
                                    <FormControlLabel key={valor} value={valor} disabled={enviando}
                                        className={`detalhes-opcao ${entrega === valor ? "selecionada" : ""}`}
                                        control={<Radio />}
                                        label={<Box><Typography className="detalhes-opcao-titulo">{titulo}</Typography><Typography>{descricao}</Typography></Box>} />
                                ))}
                            </RadioGroup>
                            {entrega === "delivery" && (
                                <Box className="detalhes-endereco">
                                    <img src={enderecoIcone} alt="" width="53" height="33" />
                                    <Box className="detalhes-endereco-dados">
                                        <Typography className="detalhes-card-descricao">Endereço de entrega</Typography>
                                        <Typography className="detalhes-endereco-nome">{endereco.nome || "Meu endereço"}</Typography>
                                        <Typography>{endereco.rua ? [endereco.rua, endereco.numero].filter(Boolean).join(", ") : (typeof usuario?.endereco === "string" ? usuario.endereco : "Cadastre seu endereço para receber os livros.")}</Typography>
                                        <Typography>{[endereco.bairro, endereco.cidade, endereco.uf].filter(Boolean).join(" - ")}</Typography>
                                        {endereco.complemento && <Typography>{endereco.complemento}</Typography>}
                                        {!temEndereco && <Typography className="detalhes-card-descricao">Complete o endereço antes de confirmar.</Typography>}
                                    </Box>
                                    <Button variant="outlined" onClick={abrirEndereco} disabled={enviando}>Alterar endereço</Button>
                                </Box>
                            )}
                            {entrega === "retirada" && (
                                <Box className="detalhes-endereco" role="region" aria-label="Endereço para retirada na biblioteca">
                                    <img src={enderecoIcone} alt="" width="53" height="33" />
                                    <Box className="detalhes-endereco-dados">
                                        <Typography className="detalhes-card-descricao">Local de retirada</Typography>
                                        <Typography className="detalhes-endereco-nome">Biblioteca Pública Municipal Luiz Brasil</Typography>
                                        <Typography>Avenida Simoa Gomes, nº 412 (nº 502)</Typography>
                                        <Typography>Heliópolis, Garanhuns - PE, CEP: 55296-705</Typography>
                                        <Typography className="detalhes-card-descricao">Fica próxima ao Parque Euclides Dourado.</Typography>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                        <Box component="section" aria-labelledby="regras-emprestimo">
                            <Typography component="h2" id="regras-emprestimo" className="detalhes-secao-titulo">Regras do empréstimo</Typography>
                            <Box className="detalhes-regras">
                                <Typography>Os prazos de entrega e devolução e os valores de multa ainda serão definidos pela biblioteca.</Typography>
                                <Box component="ul">
                                    <li>Conserve o livro: não risque, não dobre as páginas e evite molhar.</li>
                                    <li>Em caso de perda ou dano, entre em contato com a biblioteca.</li>
                                </Box>
                                <FormControlLabel control={<Checkbox checked={aceite} disabled={enviando} onChange={event => setAceite(event.target.checked)} />}
                                    label="Li e concordo com as orientações de empréstimo da biblioteca." />
                            </Box>
                        </Box>
                        <Divider className="detalhes-divisor" />
                        <Stack direction="row" justifyContent="space-between" className="detalhes-resumo">
                            <Typography>{livros.length} {livros.length === 1 ? "livro" : "livros"} • {entrega === "delivery" ? "Entrega por delivery" : "Retirada na biblioteca"}</Typography>
                            <Typography>Revise antes de enviar</Typography>
                        </Stack>
                        {feedback?.severity === "error" && <Alert severity="error" role="alert">{feedback.message}</Alert>}
                        <Stack direction="row" justifyContent="flex-end" spacing={3} className="detalhes-acoes">
                            <Button variant="outlined" onClick={voltar} disabled={enviando}>Voltar</Button>
                            <Button variant="contained" onClick={confirmarSolicitacao}
                                disabled={!aceite || enviando || (entrega === "delivery" && !temEndereco)}
                                startIcon={enviando ? <CircularProgress size={16} color="inherit" /> : undefined}>
                                {enviando ? "Enviando..." : "Confirmar solicitação"}
                            </Button>
                        </Stack>
                    </Box>
                )}
            </Box>
            <Footer />
            <Dialog open={modalAberto} onClose={() => setModalAberto(false)} maxWidth={false} fullWidth
                aria-labelledby="titulo-alterar-endereco" className="detalhes-endereco-dialog">
                <Box component="form" onSubmit={salvarEndereco}>
                    <DialogTitle id="titulo-alterar-endereco">
                        Alterar endereço de entrega
                        <IconButton aria-label="Fechar alteração de endereço" onClick={() => setModalAberto(false)}><CloseIcon /></IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Typography sx={{ mb: 3 }}>Informe onde você quer receber os livros.</Typography>
                        <Box className="detalhes-campos">
                            {CAMPOS_ENDERECO.map(([campo, label, placeholder]) => (
                                <TextField key={campo} name={campo} label={label} placeholder={placeholder}
                                    value={rascunho[campo]} required={campo !== "nome" && campo !== "complemento"}
                                    size="small" fullWidth autoFocus={campo === "nome"}
                                    onChange={event => setRascunho(anterior => ({ ...anterior, [campo]: event.target.value }))}
                                    slotProps={{ htmlInput: {
                                        maxLength: campo === "uf" ? 2 : campo === "cep" ? 9 : 150,
                                        inputMode: campo === "cep" ? "numeric" : "text",
                                    } }} />
                            ))}
                        </Box>
                        <Typography className="detalhes-card-descricao" sx={{ mt: 2 }}>A alteração ficará salva no seu perfil neste navegador.</Typography>
                        {erroEndereco && <Alert severity="error" sx={{ mt: 2 }}>{erroEndereco}</Alert>}
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={() => setModalAberto(false)}>Cancelar</Button>
                        <Button variant="contained" type="submit">Salvar endereço</Button>
                    </DialogActions>
                </Box>
            </Dialog>
            <Snackbar open={feedback?.severity === "success"} autoHideDuration={5000} onClose={() => setFeedback(null)}>
                <Alert severity="success" onClose={() => setFeedback(null)}>{feedback?.message}</Alert>
            </Snackbar>
        </Box>
    );
}
