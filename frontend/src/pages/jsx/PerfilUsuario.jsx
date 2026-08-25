import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from '@mui/material';
import "../css/Perfil.css";
import Footer from "../../components/jsx/Footer.jsx";
import Header from "../../components/jsx/Header.jsx";

// DADOS MOKADOS
const MOCK_USUARIOS = {
  admin: {
    nome: "Fernanda Oliveira",
    email: "fernanda@empresa.com",
    telefone: "(81) 99999-0001",
    infoEspecifica: "Nível: Administrador Geral | Setor: Diretoria",
  },
  funcionario: {
    nome: "Carlos Mendes",
    email: "carlos@empresa.com",
    telefone: "(81) 99999-0002",
    infoEspecifica: "Cargo: Atendente | Turno: Manhã",
  },
  entregador: {
    nome: "Rafael Lima",
    email: "rafael@empresa.com",
    telefone: "(81) 99999-0003",
    infoEspecifica: "Veículo: Motocicleta | CNH: Categoria A",
  },
  usuario: { // Mudado para 'usuario' para casar certinho com o seu login
    nome: "Mariana Santos",
    email: "mariana@email.com",
    telefone: "(81) 99999-0004",
    endereco: "Rua das Flores, 42 - Centro",
    infoEspecifica: "Membro desde: 12/03/2023",
  },
};

export default function PerfilUsuario() {
  // Estados para gerenciar a tela
  const [tipoUsuario, setTipoUsuario] = useState("usuario");
  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    telefone: "",
    infoEspecifica: "",
    endereco: "",
    foto: ""
  });
  // guarda os dados antes de entrar em modo de edição, pra poder cancelar
  const [dadosOriginais, setDadosOriginais] = useState(null);

  // ─── PEGA O USUÁRIO LOGADO AUTOMATICAMENTE ──────────────────────────────────
  useEffect(() => {
    const tipoLogado = localStorage.getItem("usuarioTipo") || "usuario";
    setTipoUsuario(tipoLogado);

    const usuarioSalvoNoLogin = localStorage.getItem("usuario");

    if (usuarioSalvoNoLogin) {
      const usuarioObjeto = JSON.parse(usuarioSalvoNoLogin);

      setDados({
        nome: usuarioObjeto.nome || MOCK_USUARIOS[tipoLogado].nome,
        email: usuarioObjeto.email || MOCK_USUARIOS[tipoLogado].email,
        telefone: usuarioObjeto.telefone || MOCK_USUARIOS[tipoLogado].telefone,
        endereco: usuarioObjeto.endereco || MOCK_USUARIOS[tipoLogado].endereco || "",
        foto: usuarioObjeto.foto || "",
        infoEspecifica: MOCK_USUARIOS[tipoLogado].infoEspecifica
      });
    } else {
      setDados(MOCK_USUARIOS[tipoLogado] || MOCK_USUARIOS["usuario"]);
    }
  }, []);

  const handleFotoChange = (e) => {
    const arquivo = e.target.files[0];

    if (arquivo) {
      const leitor = new FileReader();

      leitor.onloadend = () => {
        setDados((prev) => ({
          ...prev,
          foto: leitor.result,
        }));
      };

      leitor.readAsDataURL(arquivo);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  const iniciarEdicao = () => {
    // guarda um snapshot pra poder restaurar se cancelar
    setDadosOriginais(dados);
    setErro("");
    setEditando(true);
  };

  const cancelarEdicao = () => {
    if (dadosOriginais) {
      setDados(dadosOriginais);
    }
    setErro("");
    setEditando(false);
  };

  const salvarAlteracoes = () => {
    if (!dados.nome.trim() || !dados.email.trim()) {
      setErro("Nome e e-mail não podem ficar vazios.");
      return;
    }

    setErro("");
    setSalvando(true);

    try {
      // Atualiza o objeto "usuario" do localStorage com os novos dados,
      // mantendo o que já existia (ex: id, tipo) e sobrescrevendo o que mudou aqui.
      const usuarioSalvoNoLogin = localStorage.getItem("usuario");
      const usuarioAtual = usuarioSalvoNoLogin ? JSON.parse(usuarioSalvoNoLogin) : {};

      const usuarioAtualizado = {
        ...usuarioAtual,
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        endereco: dados.endereco,
        foto: dados.foto,
      };

      localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));

      setEditando(false);
      alert("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      setErro("Não foi possível salvar agora. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  return (
     <Box className="container">
        <Header />
      <div className="container-perfil" sx={{mt:5}}>
        <div className="conteudo-perfil">

          {/* BARRA LATERAL (SIDEBAR) */}
          <aside className="sidebar-perfil">
            <div className="avatar-container">
              {dados.foto ? (
                <img
                  src={dados.foto}
                  alt="Foto de Perfil"
                  className="avatar-img"
                />
              ) : (
                <div className="avatar-placeholder">👤</div>
              )}

              {editando && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="input-foto"
                />
              )}
            </div>
            <h2>{dados.nome}</h2>
            <span className={`badge-tipo ${tipoUsuario}`}>{tipoUsuario.toUpperCase()}</span>

            <div className="botoes-acao">
              {!editando ? (
                <button className="btn-editar" onClick={iniciarEdicao}>Editar Perfil</button>
              ) : (
                <>
                  <button
                    className="btn-salvar"
                    onClick={salvarAlteracoes}
                    disabled={salvando}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    {salvando && <CircularProgress size={14} color="inherit" />}
                    {salvando ? "Salvando..." : "Salvar"}
                  </button>
                  <button className="btn-cancelar" onClick={cancelarEdicao} disabled={salvando}>
                    Cancelar
                  </button>
                </>
              )}
            </div>
            {erro && <p style={{ color: "#c62828", fontSize: "0.85rem", marginTop: "8px" }}>{erro}</p>}
          </aside>

          {/* ÁREA DOS DADOS */}
          <main className="dados-perfil">
            <h3>Meus Dados (Logado como {tipoUsuario})</h3>

            <div className="campo-grupo">
              <label>Nome Completo:</label>
              {editando ? (
                <input type="text" name="nome" value={dados.nome} onChange={handleChange} />
              ) : (
                <p>{dados.nome}</p>
              )}
            </div>

            <div className="campo-grupo">
              <label>E-mail:</label>
              {editando ? (
                <input type="email" name="email" value={dados.email} onChange={handleChange} />
              ) : (
                <p>{dados.email}</p>
              )}
            </div>

            <div className="campo-grupo">
              <label>Telefone:</label>
              {editando ? (
                <input type="text" name="telefone" value={dados.telefone} onChange={handleChange} />
              ) : (
                <p>{dados.telefone}</p>
              )}
            </div>
            {tipoUsuario === "usuario" && (
              <div className="campo-grupo">
                <label>Endereço:</label>

                {editando ? (
                  <input
                    type="text"
                    name="endereco"
                    value={dados.endereco}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{dados.endereco}</p>
                )}
              </div>
            )}

            {/* INFORMAÇÕES EXCLUSIVAS DO SEU TIPO DE USUÁRIO */}
            <div className="card-especifico">
              <h4>Informações do Sistema</h4>
              <p>{dados.infoEspecifica}</p>
            </div>
          </main>
          <Footer/>
        </div>
      </div>
    </Box>
  );
}