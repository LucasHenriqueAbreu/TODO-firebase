const tarefaRepository = new TarefaRepository();

function salvar() {
    const descricao = document.getElementById('descricao').value;
    const tarefa = { descricao: descricao, pronta: false };
    tarefaRepository.create(tarefa).then((resultad) => {
        alert('Tarefa cadastrada com sucesso.');
    }).catch((error) => {
        alert('Não foi possível cadastrar a tarefa.');
    })
}

function listagemDeTarefas() {
    tarefaRepository.list().then(tarefas => {
        montaTabela(tarefas);
    }).catch(error => {
        alert('Nâo foi possível carregar as tarefas.');
    })
}

function montaTabela(tarefas) {
    const corpoTabela = document.getElementsByTagName('tbody')[0];
    for (let i = 0; i < tarefas.length; i++) {
        const tarefaVez = tarefas[i];
        const linhaTabela = document.createElement('tr');
        const celulaDescricao = document.createElement('td');
        celulaDescricao.append(document.createTextNode(tarefaVez.descricao));
        linhaTabela.append(celulaDescricao);

        const celulaPronto = document.createElement('td');
        celulaPronto.append(document.createTextNode(tarefaVez.pronta));
        linhaTabela.append(celulaPronto);

        corpoTabela.append(linhaTabela);
    }
}

listagemDeTarefas();