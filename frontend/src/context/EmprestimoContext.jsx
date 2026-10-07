import { createContext, useContext, useEffect, useState } from "react";

const EmprestimoContext = createContext(null);

const STORAGE_KEY = "solicitacaoEmprestimo";

function carregarInicial() {
    try {
        const salvo = localStorage.getItem(STORAGE_KEY);
        return salvo ? JSON.parse(salvo) : [];
    } catch {
        return [];
    }
}

export function EmprestimoProvider({ children }) {
    const [livros, setLivros] = useState(carregarInicial);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(livros));
        } catch {
            // ignora falha de armazenamento (ex: modo privado do navegador)
        }
    }, [livros]);

    return (
        <EmprestimoContext.Provider value={{ livros, setLivros }}>
            {children}
        </EmprestimoContext.Provider>
    );
}

export function useEmprestimo() {
    const context = useContext(EmprestimoContext);
    if (!context) {
        throw new Error("useEmprestimo deve ser usado dentro de um EmprestimoProvider");
    }
    return context;
}
