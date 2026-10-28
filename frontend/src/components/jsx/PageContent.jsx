import Box from "@mui/material/Box";

/** Limita apenas o conteúdo; cabeçalho e rodapé ficam fora deste componente. */
export default function PageContent({ children, component = "main", className = "", maxWidth = 1360, responsive = false, sx = [], ...props }) {
    return (
        <Box component={component} className={("page-content " + className).trim()}
            sx={[
                { width: "100%", maxWidth, minWidth: 0, mx: "auto",
                  px: responsive ? { xs: 2, sm: 3, md: 6 } : 6,
                  py: responsive ? { xs: 3, md: 4 } : 4 },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]} {...props}>
            {children}
        </Box>
    );
}
