# Detalhes da solicitação de empréstimo
acervo7colinas\frontend\src\pages\jsx\DetalhesSolicitacaoEmprestimo.jsx
acervo7colinas\frontend\src\pages\css\DetalhesSolicitacaoEmprestimo.css

Implementação restrita ao frontend.

- Fluxo: lista → detalhes dos livros selecionados → confirmação.
- A confirmação verifica exemplares e usa o contrato anterior POST /emprestimos: user_id e livro_ids.
- No backend deste checkout não há rota /emprestimos registrada. O frontend exibe erro real e conserva a seleção caso o envio falhe.
- Delivery e retirada estão disponíveis na interface. A modalidade e o endereço NÃO são enviados ou gravados no servidor, pois ainda não existe contrato para eles.
- Salvar endereço atualiza usuario no localStorage, como a tela PerfilUsuario. A string endereco continua compatível com o perfil; enderecoEntrega guarda os campos estruturados. Essa alteração não atualiza o banco e pode ser substituída no próximo login.
- Prazos e multa exibem A definir. Valores do Figma não são tratados como regras aprovadas. Configuração: src/utils/solicitacao.js.
- A equipe de backend precisa definir atualização de endereço do usuário, persistência da modalidade/endereço da solicitação, regras e validação de disponibilidade/limites no envio.
- A lista conserva livros não selecionados depois de confirmar.
