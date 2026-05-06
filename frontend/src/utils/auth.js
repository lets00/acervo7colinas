// src/utils/auth.js  ← apague TUDO e coloque só isso

export const saveToken = (token) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
};

export const getToken = () => localStorage.getItem('token');

export const isAuthenticated = () => !!getToken();

export const saveUsuario = (dados) => {
    localStorage.setItem('usuario', JSON.stringify(dados));
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