export const chaveFotoPerfil = (email) => {
    const emailNormalizado = email?.trim().toLowerCase();
    return emailNormalizado ? `fotoPerfil:${emailNormalizado}` : null;
};

export const obterFotoPerfil = (email) => {
    const chave = chaveFotoPerfil(email);
    return chave ? localStorage.getItem(chave) : null;
};

export const salvarFotoPerfil = (email, fotoPerfil) => {
    const chave = chaveFotoPerfil(email);

    if (!chave) {
        throw new Error("Informe um e-mail para salvar a foto do perfil.");
    }

    localStorage.setItem(chave, fotoPerfil);
};

export const comprimirFotoPerfil = (arquivo) => new Promise((resolve, reject) => {
    if (!arquivo?.type?.startsWith("image/")) {
        reject(new Error("Selecione um arquivo de imagem válido."));
        return;
    }

    const leitor = new FileReader();

    leitor.onerror = () => reject(new Error("Não foi possível carregar a imagem."));
    leitor.onload = () => {
        const imagem = new Image();

        imagem.onerror = () => reject(new Error("Não foi possível abrir a imagem."));
        imagem.onload = () => {
            const escala = Math.min(1, 400 / Math.max(imagem.width, imagem.height));
            const largura = Math.max(1, Math.round(imagem.width * escala));
            const altura = Math.max(1, Math.round(imagem.height * escala));
            const canvas = document.createElement("canvas");
            canvas.width = largura;
            canvas.height = altura;

            const contexto = canvas.getContext("2d");
            if (!contexto) {
                reject(new Error("Não foi possível processar a imagem."));
                return;
            }

            contexto.fillStyle = "#fff";
            contexto.fillRect(0, 0, largura, altura);
            contexto.drawImage(imagem, 0, 0, largura, altura);

            try {
                resolve(canvas.toDataURL("image/jpeg", 0.8));
            } catch (error) {
                reject(error);
            }
        };

        imagem.src = leitor.result;
    };

    leitor.readAsDataURL(arquivo);
});
