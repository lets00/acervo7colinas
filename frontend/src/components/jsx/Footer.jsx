import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from "../../assets/LOGO-FOOTER 1.png";
import "../css/Footer.css";

const categorias = ["Ficção", "Autoajuda", "Romance", "Mistério", "Fantasia", "Terror"];

const links = [
    "Sobre nós",
    "Prefeitura de Garanhuns",
    "Termos de Uso e Privacidade",
    "Regras de uso",
];

export default function Footer() {
    return (
        <Box component="footer" className="footer-root">
            <Container maxWidth={false} className="footer-container">
                <Grid container spacing={4} alignItems="flex-start" justifyContent="space-between">
                    {/* Logo + Redes Sociais */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Box className="footer-logo-area">
                            <img src={logo} alt="Acervo Sete Colinas" className="footer-logo" />
                            <Box className="footer-social-wrapper">
                                <Typography className="footer-social-title">Redes Sociais</Typography>
                                <Box className="footer-social-icons">
                                    <Box className="footer-social-icon">
                                        <FacebookIcon />
                                    </Box>
                                    <Box className="footer-social-icon">
                                        <InstagramIcon />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Categorias */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography className="footer-section-title">Categorias</Typography>
                        <Box className="footer-links-list">
                            {categorias.map((cat) => (
                                <Typography key={cat} className="footer-link">
                                    {cat}
                                </Typography>
                            ))}
                        </Box>
                    </Grid>

                    {/* Links */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography className="footer-section-title">Links</Typography>
                        <Box className="footer-links-list">
                            {links.map((link) => (
                                <Typography key={link} className="footer-link">
                                    {link}
                                </Typography>
                            ))}
                        </Box>
                    </Grid>

                    {/* Contato e Endereço */}
                    <Grid item xs={12} sm={6} md={2}>
                        <Typography className="footer-section-title">Contato e endereço</Typography>
                        <Box className="footer-contact-item">
                            <PhoneIcon className="footer-contact-icon" />
                            <Typography className="footer-contact-text">+55 873761-9611</Typography>
                        </Box>
                        <Box className="footer-contact-item">
                            <AccessTimeIcon className="footer-contact-icon" />
                            <Typography className="footer-contact-text">12:00 as 17:00</Typography>
                        </Box>
                    </Grid>

                    {/* CTA */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Box className="footer-cta-area">
                            <Typography className="footer-cta-text">
                                Se tiver alguma dúvida, pode entrar em contato conosco.
                            </Typography>
                            <Button variant="outlined" className="footer-cta-button">
                                Fale conosco
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Divider className="footer-divider" />

            <Box className="footer-bottom">
                <Typography className="footer-copyright">
                    © 2026 Todos os direitos reservados
                </Typography>
            </Box>
        </Box>
    );
}