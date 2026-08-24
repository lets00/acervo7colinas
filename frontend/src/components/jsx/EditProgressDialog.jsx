import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function EditProgressDialog({ open, item, value, onChange, onClose, onSave }) {
    const invalido =
        value === "" || Number(value) < 0 || Number(value) > (item?.totalPaginas ?? 0);

    const handleSalvar = () => {
        if (invalido) return;
        onSave(Number(value));
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            PaperProps={{ sx: { borderRadius: "20px", p: "8px 16px 8px" } }}
        >
            <DialogContent>
                <Typography variant="h6" fontWeight={600} color="#312793">
                    Editar progresso
                </Typography>

                <Typography variant="body2" fontWeight={700} sx={{ mt: "12px" }}>
                    {item?.titulo}
                </Typography>

                <TextField
                    autoFocus
                    fullWidth
                    type="number"
                    margin="normal"
                    label="Páginas lidas"
                    value={value}
                    error={invalido}
                    helperText={
                        invalido
                            ? `Informe um valor entre 0 e ${item?.totalPaginas ?? 0}`
                            : `de ${item?.totalPaginas ?? 0} páginas`
                    }
                    slotProps={{ htmlInput: { min: 0, max: item?.totalPaginas ?? 0 } }}
                    onChange={(e) => onChange(e.target.value)}
                />
            </DialogContent>

            <Box>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button
                        variant="contained"
                        disabled={invalido}
                        onClick={handleSalvar}
                        sx={{
                            bgcolor: "#37228b",
                            "&:hover": { bgcolor: "#312793" },
                        }}
                    >
                        Salvar
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
