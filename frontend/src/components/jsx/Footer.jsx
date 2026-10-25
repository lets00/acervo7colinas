import React from "react";
import Box from "@mui/material/Box";
import PageContent from "./PageContent";
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
            <PageContent responsive component="div" className="footer-inner" sx={{ pt: 0, pb: { xs: 3, md: 5 } }}>
                <Box className="footer-grid">
                    {/* Logo + Redes Sociais */}
                    <Box className="footer-brand-section">
                        <Box className="footer-logo-area">
                            <img src={logo} alt="Acervo Sete Colinas" className="footer-logo" />
                            <Box className="footer-social-wrapper footer-social-desktop">
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
                    </Box>

                    {/* Categorias */}
                    <Box className="footer-categories-section">
                        <Typography className="footer-section-title">Categorias</Typography>
                        <Box className="footer-links-list">
                            {categorias.map((cat) => (
                                <Typography key={cat} className="footer-link">
                                    {cat}
                                </Typography>
                            ))}
                        </Box>
                    </Box>

                    {/* Links */}
                    <Box className="footer-links-section">
                        <Typography className="footer-section-title">Links</Typography>
                        <Box className="footer-links-list">
                            {links.map((link) => (
                                <Typography key={link} className="footer-link">
                                    {link}
                                </Typography>
                            ))}
                        </Box>
                    </Box>

                    {/* Contato e Endereço */}
                    <Box className="footer-contact-section">
                        <Box className="footer-contact-details">
                        <Typography className="footer-section-title">Contato e endereço</Typography>
                        <Box className="footer-contact-item">
                            <PhoneIcon className="footer-contact-icon" />
                            <Typography className="footer-contact-text">+55 873761-9611</Typography>
                        </Box>
                        <Box className="footer-contact-item">
                            <AccessTimeIcon className="footer-contact-icon" />
                            <Typography className="footer-contact-text">12:00 as 17:00</Typography>
                        </Box>
                        </Box>
                        <Box className="footer-social-wrapper footer-social-mobile">
                            <Typography className="footer-social-title">Redes Sociais</Typography>
                            <Box className="footer-social-icons">
                                <Box className="footer-social-icon"><FacebookIcon /></Box>
                                <Box className="footer-social-icon"><InstagramIcon /></Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* CTA */}
                    <Box className="footer-cta-section">
                        <Box className="footer-cta-area">
                            <Typography className="footer-cta-text">
                                Se tiver alguma dúvida, pode entrar em contato conosco.
                            </Typography>
                            <Button variant="outlined" className="footer-cta-button">
                                Fale conosco
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </PageContent>

            <Divider className="footer-divider" />

            <Box className="footer-bottom">
                <Typography className="footer-copyright">
                    © 2026 Todos os direitos reservados
                </Typography>
            </Box>
        </Box>
    );
}