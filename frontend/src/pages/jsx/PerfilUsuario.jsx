import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from '@mui/material';
import "../css/Perfil.css";
import Footer from "../../components/jsx/Footer.jsx";
import Header from "../../components/jsx/Header.jsx";
import { getUsuario, getToken, saveUsuario } from "../../utils/auth";
import api from "../../services/apis";
import {
  comprimirFotoPerfil,
  obterFotoPerfil,
  salvarFotoPerfil,
} from "../../utils/fotoPerfil";

const formatarEndereco = (usuario) => {
  if (typeof usuario.endereco === "string") {
    return usuario.endereco;
  }

  const endereco = usuario.endereco && typeof usuario.endereco === "object"
    ? usuario.endereco
    : usuario;

  return [
    [endereco.rua, endereco.numero].filter(Boolean).join(", "),
    endereco.complemento,
    endereco.bairro,
    endereco.cidade,
    endereco.cep ? `CEP: ${endereco.cep}` : "",
  ].filter(Boolean).join(" - ");
};

export default function PerfilUsuario() {
  // Estados para gerenciar a tela
  const [tipoUsuario, setTipoUsuario] = useState("usuario");
  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    telefone: "",
    infoEspecifica: "",
    endereco: "",
    fotoPerfil: ""
  });
  // guarda os dados antes de entrar em modo de edição, pra poder cancelar
  const [dadosOriginais, setDadosOriginais] = useState(null);
  const [fotoComErro, setFotoComErro] = useState(false);

  useEffect(() => {
    let ativo = true;
    const tipoLogado =
      localStorage.getItem("usuarioTipo") || "usuario";

    setTipoUsuario(tipoLogado);

    const usuario = getUsuario();

    const preencherDados = (usuario) => {
      setTipoUsuario(usuario.tipo || tipoLogado);
      setDados({
        nome: usuario.nomeCompleto || usuario.nome || "",
        email: usuario.email || "",
        telefone: usuario.telefone || "",
        endereco: formatarEndereco(usuario),
        fotoPerfil: obterFotoPerfil(usuario.email) || (usuario.fotoPerfil?.startsWith('/')
          ? `${api.defaults.baseURL}${usuario.fotoPerfil}` : usuario.fotoPerfil) || "",
        infoEspecifica: ""
      });
    };
    if (usuario) preencherDados(usuario);

    const token = getToken();
    if (!token) {
      setErro("Faça login para carregar os dados do perfil.");
      setCarregando(false);
      return;
    }

    api.get('/login/perfil', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        if (!ativo) return;
        saveUsuario(data);
        localStorage.setItem("usuarioTipo", data.tipo);
        preencherDados(data);
        window.dispatchEvent(new Event("usuario-atualizado"));
      })
      .catch((error) => {
        if (ativo) setErro(error.response?.data?.mensagem || "Não foi possível carregar os dados atualizados do perfil.");
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => { ativo = false; };
  }, []);

  const handleFotoChange = async (e) => {
    const arquivo = e.target.files?.[0];
    e.target.value = "";

    if (!arquivo) return;

    setFotoComErro(false);
    try {
      const fotoPerfil = await comprimirFotoPerfil(arquivo);
      setDados((prev) => ({ ...prev, fotoPerfil }));
      setErro("");
    } catch (error) {
      console.error("Erro ao processar foto do perfil:", error);
      setErro(error.message || "Não foi possível carregar a imagem.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  const iniciarEdicao = () => {
    setDadosOriginais(dados);
    setFotoComErro(false);
    setErro("");
    setEditando(true);
  };

  const cancelarEdicao = () => {
    if (dadosOriginais) {
      setDados(dadosOriginais);
    }
    setFotoComErro(false);
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
      const usuarioSalvoNoLogin = localStorage.getItem("usuario");
      const usuarioAtual = usuarioSalvoNoLogin ? JSON.parse(usuarioSalvoNoLogin) : {};

      const usuarioAtualizado = {
        ...usuarioAtual,
        nomeCompleto: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        endereco: dados.endereco,
        fotoPerfil: dados.fotoPerfil,
      };
      delete usuarioAtualizado.foto;

      if (dados.fotoPerfil) {
        salvarFotoPerfil(dados.email, dados.fotoPerfil);
      }
      localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));
      window.dispatchEvent(new Event("usuario-atualizado"));

      setDadosOriginais(dados);
      setEditando(false);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      const armazenamentoCheio =
        error.name === "QuotaExceededError" ||
        error.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
        error.code === 22;
      setErro(
        armazenamentoCheio
          ? "A foto é grande demais para ser guardada neste navegador. Escolha outra imagem."
          : "Não foi possível salvar agora. Tente novamente."
      );
    } finally {
      setSalvando(false);
    }
  };

  return (
     <Box className="profile-page">
        <Header />
      <div className="container-perfil">
        <div className="conteudo-perfil">

          {/* BARRA LATERAL (SIDEBAR) */}
          <aside className="sidebar-perfil">
              <div className="avatar-container">
                {dados.fotoPerfil && !fotoComErro ? (
                  <img
                    src={dados.fotoPerfil}
                    alt="Foto de perfil"
                    className="avatar-img"
                    onError={() => setFotoComErro(true)}
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
                <button className="btn-editar" onClick={iniciarEdicao} disabled={carregando}>Editar Perfil</button>
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
            <h3>Meus Dados</h3>
            {carregando && <CircularProgress size={24} aria-label="Carregando perfil" />}

            <div className="campo-grupo">
              <label>Nome Completo:</label>
              {editando ? (
                <input type="text" name="nome" value={dados.nome} onChange={handleChange} />
              ) : (
                <p>{dados.nome || "Não informado"}</p>
              )}
            </div>

            <div className="campo-grupo">
              <label>E-mail:</label>
              {editando ? (
                <input type="email" name="email" value={dados.email} onChange={handleChange} />
              ) : (
                <p>{dados.email || "Não informado"}</p>
              )}
            </div>

            <div className="campo-grupo">
              <label>Telefone:</label>
              {editando ? (
                <input type="text" name="telefone" value={dados.telefone} onChange={handleChange} />
              ) : (
                <p>{dados.telefone || "Não informado"}</p>
              )}
            </div>
            {(tipoUsuario === "usuario" || tipoUsuario === "entregador") && (
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
                  <p>{dados.endereco || "Não informado"}</p>
                )}
              </div>
            )}

            {/* INFORMAÇÕES EXCLUSIVAS DO SEU TIPO DE USUÁRIO */}
            {dados.infoEspecifica && (
              <div className="card-especifico">
                <h4>Informações do Sistema</h4>
                <p>{dados.infoEspecifica}</p>
              </div>
            )}
          </main>

        </div>
      </div>
      <Footer />
    </Box>
  );
}
