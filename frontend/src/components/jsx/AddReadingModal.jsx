import { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InfoIcon from "@mui/icons-material/Info";
import iconIsbn from "../../assets/isbn.png";

const isSameOption = (option, value) => option?.id === value?.id;

export default function AddReadingModal({ open, onClose, onAdd, livrosEmProgresso = [] }) {
    const [termo, setTermo] = useState("");
    const [opcoes, setOpcoes] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [livroSelecionado, setLivroSelecionado] = useState(null);
    const [expandido, setExpandido] = useState(false);
    const [paginasLidas, setPaginasLidas] = useState(0);
    const debounceRef = useRef(null);

    useEffect(() => {
        if (!open) {
            setTermo("");
            setOpcoes([]);
            setLivroSelecionado(null);
            setExpandido(false);
            setPaginasLidas(0); 
        }
    }, [open]);

    useEffect(() => {
        if (termo.trim() === "") {
            setOpcoes([]);
            setCarregando(false);
            return undefined;
        }

        setCarregando(true);

        debounceRef.current = setTimeout(async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/livros?titulo=${encodeURIComponent(termo)}`
                );
                if (!res.ok) throw new Error("Erro na busca");
                const data = await res.json();
                setOpcoes(Array.isArray(data) ? data : []);
            } catch {
                setOpcoes([]);
            } finally {
                setCarregando(false);
            }
        }, 400);

        return () => clearTimeout(debounceRef.current);
    }, [termo, livrosEmProgresso]);

    const handleSelecionar = (_, valor) => {
        setLivroSelecionado(valor);
        setExpandido(false);
    };

    const jaEmProgresso = livroSelecionado
        ? livrosEmProgresso.some(
              (p) => String(p.livro_id ?? p.livroId ?? p.id) === String(livroSelecionado.id)
          )
        : false;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            PaperProps={{ sx: { borderRadius: "20px", p: "8px 24px 16px" } }}
        >
            {/* CABEÇALHO */}
            <Box sx={{ position: "relative", pt: "16px", pr: "40px" }}>
                <IconButton
                    aria-label="fechar"
                    onClick={onClose}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h4" fontWeight={600} color="#312793">
                    Adicione uma leitura!
                </Typography>
                <Typography variant="body2" color="rgba(0,0,0,0.7)">
                    pesquise o título de seu interesse
                </Typography>
            </Box>

            <DialogContent sx={{ px: 0 }}>
                {/* CAMPO DE PESQUISA */}
                <Autocomplete
                    fullWidth
                    options={opcoes}
                    value={livroSelecionado}
                    onChange={handleSelecionar}
                    onInputChange={(_, novoValor) => setTermo(novoValor)}
                    getOptionLabel={(option) => `${option.titulo} – ${option.autor}`}
                    isOptionEqualToValue={isSameOption}
                    loading={carregando}
                    noOptionsText="Nenhum resultado encontrado"
                    renderOption={(props, option) => {
                        const { key, ...rest } = props;
                        return (
                            <Box component="li" key={key} {...rest}>
                                <Box
                                    component="img"
                                    src={option.img ? `http://localhost:3000${option.img}` : ""}
                                    alt=""
                                    sx={{
                                        width: 32,
                                        height: 44,
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                        mr: "10px",
                                        bgcolor: "#eee",
                                    }}
                                />
                                <Box>
                                    <Typography variant="body2">{option.titulo}</Typography>
                                    <Typography variant="caption" color="rgba(0,0,0,0.6)">
                                        {option.autor} • {option.ano}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Título"
                            variant="outlined"
                            placeholder="Ex.: Dom Casmurro"
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {carregando ? <CircularProgress size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                },
                            }}
                        />
                    )}
                />

                {/* INFORMAÇÕES DO LIVRO SELECIONADO */}
                {livroSelecionado && (
                    <Box sx={{ mt: "28px" }}>
                        <Typography variant="h6" fontWeight={600} color="#37228b">
                            Informações
                        </Typography>

                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing="24px"
                            sx={{ mt: "12px" }}
                        >
                            {/* CAPA */}
                            <Box
                                component="img"
                                src={
                                    livroSelecionado.img
                                        ? `http://localhost:3000${livroSelecionado.img}`
                                        : ""
                                }
                                alt={livroSelecionado.titulo}
                                sx={{
                                    width: 160,
                                    height: 230,
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                                    flexShrink: 0,
                                }}
                            />

                            {/* DADOS */}
                            <Box sx={{ minWidth: 0 }}>
                                <Typography fontWeight={700} fontSize="1.25rem" color="#312793">
                                    {livroSelecionado.titulo}
                                </Typography>
                                <Typography color="rgba(0,0,0,0.64)" sx={{ mb: "10px" }}>
                                    {livroSelecionado.autor}
                                </Typography>

                                <Stack direction="row" flexWrap="wrap" gap="12px 24px">
                                    <MetaItem icon={<AutoStoriesIcon fontSize="small" />} text={livroSelecionado.editora} />
                                    <MetaItem icon={<MenuBookIcon fontSize="small" />} text={livroSelecionado.quantidadePaginas ? `${livroSelecionado.quantidadePaginas} páginas` : "—"} />
                                    <MetaItem icon={<CalendarMonthIcon fontSize="small" />} text={livroSelecionado.ano} />
                                    <MetaItem
                                        icon={<Box component="img" src={iconIsbn} alt="" width={18} height={18} />}
                                        text={`ISBN: ${livroSelecionado.isbn}`}
                                    />
                                    <MetaItem icon={<InfoIcon fontSize="small" />} text={livroSelecionado.idioma ?? "—"} />
                                </Stack>

                                <Stack direction="row" alignItems="baseline" gap="6px" sx={{ mt: "10px" }}>
                                    <Typography variant="body2" color="rgba(0,0,0,0.7)">
                                        Gêneros:
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600} color="#37228b" sx={{ textDecoration: "underline" }}>
                                        {livroSelecionado.genero}
                                    </Typography>
                                </Stack>

                                <Typography
                                    variant="body2"
                                    color="rgba(0,0,0,0.75)"
                                    sx={{
                                        mt: "12px",
                                        display: "-webkit-box",
                                        WebkitLineClamp: expandido ? "unset" : 3,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    {livroSelecionado.descricao}
                                </Typography>

                                <Button
                                    size="small"
                                    onClick={() => setExpandido((prev) => !prev)}
                                    sx={{ textTransform: "none", px: "4px", minWidth: 0 }}
                                >
                                    {expandido ? "Ver menos" : "Ver mais"}
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                )}
            </DialogContent>

            {/* RODAPÉ */}
            <Box sx={{ pb: "4px" }}>
                {jaEmProgresso && (
                    <Typography
                        sx={{
                            mb: "12px",
                            color: "#b00020",
                            fontWeight: 500,
                            textAlign: "right",
                        }}
                    >
                        Este livro já está em progresso de leitura.
                    </Typography>
                )}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        disabled={!livroSelecionado || jaEmProgresso}
                        onClick={() => onAdd(livroSelecionado, paginasLidas)}
                        sx={{
                            bgcolor: "#37228b",
                            textTransform: "uppercase",
                            borderRadius: "10px",
                            px: "32px",
                            "&:hover": { bgcolor: "#312793" },
                        }}
                    >
                        Adicionar
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}

function MetaItem({ icon, text }) {
    return (
        <Stack direction="row" alignItems="center" gap="6px">
            {icon}
            <Typography variant="body2" color="rgba(0,0,0,0.7)">
                {text ?? "—"}
            </Typography>
        </Stack>
    );
}
