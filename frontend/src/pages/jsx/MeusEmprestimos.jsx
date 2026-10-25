import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Box, Button, CircularProgress, Divider, Typography } from "@mui/material";
import PageContent from "../../components/jsx/PageContent";
import Header from "../../components/jsx/Header";
import Footer from "../../components/jsx/Footer";
import { getToken } from "../../utils/auth";
import "../css/MeusEmprestimos.css";

export default function MeusEmprestimos() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [quantidade, setQuantidade] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [tentativa, setTentativa] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        async function carregar() {
            setCarregando(true);
            setErro("");
            try {
                const token = getToken();
                if (!token) throw new Error("Faça login para consultar seus empréstimos.");
                const { data } = await axios.get("http://localhost:3000/usuario/emprestimos", {
                    headers: { Authorization: `Bearer ${token}` }, signal: controller.signal,
                });
                if (!Number.isInteger(data.quantidade) || data.quantidade < 0) throw new Error("Quantidade de empréstimos inválida.");
                setQuantidade(data.quantidade);
            } catch (error) {
                if (!controller.signal.aborted) setErro(error.response?.data?.mensagem ?? error.message);
            } finally {
                if (!controller.signal.aborted) setCarregando(false);
            }
        }
        carregar();
        return () => controller.abort();
    }, [tentativa]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", bgcolor: "#fff" }}>
            <Header />
            <PageContent>
                <div className="emprestimos-page">
                    <div className="emprestimos-topbar">
                        <h1 className="emprestimos-titulo">Meus Empréstimos</h1>
                        <Button variant="contained" onClick={() => navigate("/solicitacao-emprestimo")}>Novo pedido</Button>
                    </div>
                    <Divider sx={{ borderColor: "#F5A623", borderBottomWidth: 2, mb: 3 }} />
                    {state?.mensagem && <Alert severity="success" sx={{ mb: 3 }}>{state.mensagem}</Alert>}
                    {carregando ? (
                        <Box role="status" sx={{ display: "flex", gap: 2, py: 4 }}>
                            <CircularProgress size={24} /><Typography>Consultando empréstimos...</Typography>
                        </Box>
                    ) : erro ? (
                        <Alert severity="error" action={<Button color="inherit" onClick={() => setTentativa(valor => valor + 1)}>Tentar novamente</Button>}>{erro}</Alert>
                    ) : (
                        <Box className="stat-emprestimo-card" sx={{ mb: 3 }}>
                            <span className="stat-emprestimo-label">Total de empréstimos registrados</span>
                            <div className="stat-emprestimo-bottom"><span className="stat-emprestimo-count">{quantidade}</span></div>
                            <Typography variant="body2">Inclui todos os registros, inclusive os devolvidos.</Typography>
                        </Box>
                    )}
                    <Alert severity="info" sx={{ mt: 3 }}>O histórico com os livros e as opções de renovação e cancelamento estarão disponíveis em uma próxima etapa.</Alert>
                </div>
            </PageContent>
            <Footer />
        </Box>
    );
}
