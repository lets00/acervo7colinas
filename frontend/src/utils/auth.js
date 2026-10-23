
import { obterFotoPerfil } from "./fotoPerfil";

export const saveToken = (token) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('user_id');
};

export const getToken = () => localStorage.getItem('token');

export const isAuthenticated = () => !!getToken();

export const saveUsuario = (dados) => {
    const usuario = { ...dados };
    delete usuario.foto;

    const fotoPerfil = obterFotoPerfil(usuario.email) || usuario.fotoPerfil;
    if (fotoPerfil) {
        usuario.fotoPerfil = fotoPerfil;
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));
};

export const getUsuario = () => {
    const dados = localStorage.getItem("usuario");

    if (!dados || dados === "undefined") return null;

    try {
        return JSON.parse(dados);
    } catch {
        return null;
    }
};

// ⚠️ Aliases para compatibilidade com o Header
export const isLogged = isAuthenticated;
export const getUser = getUsuario;
export const clearSession = removeToken;
export const logout = removeToken;