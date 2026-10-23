// Preencher somente depois da definição das regras pela biblioteca.
export const REGRAS_EMPRESTIMO = {
    prazoEntregaDiasUteis: null,
    prazoDevolucaoDias: null,
    multaDiariaPorLivro: null,
};

export function enderecoDoUsuario(usuario) {
    const base = usuario?.enderecoEntrega ?? (typeof usuario?.endereco === "object" ? usuario.endereco : usuario) ?? {};
    return Object.fromEntries(["nome", "cep", "rua", "numero", "complemento", "bairro", "cidade", "uf"].map(campo => [
        campo, String(campo === "nome" ? (base.nomeEndereco ?? "") : (base[campo] ?? "")),
    ]));
}

export function enderecoCompleto(endereco) {
    return ["cep", "rua", "numero", "bairro", "cidade", "uf"].every(campo => endereco[campo]?.trim())
        && /^\d{5}-?\d{3}$/.test(endereco.cep) && /^[A-Za-z]{2}$/.test(endereco.uf);
}

export function formatarEndereco(endereco) {
    return [
        [endereco.rua, endereco.numero].filter(Boolean).join(", "),
        endereco.complemento,
        [endereco.bairro, endereco.cidade, endereco.uf.toUpperCase()].filter(Boolean).join(" - "),
        endereco.cep,
    ].filter(Boolean).join(", ");
}

export function capaLivro(livro) {
    if (!livro.img) return undefined;
    return livro.img.startsWith("/") ? `http://localhost:3000${livro.img}` : livro.img;
}
