const tarefaRepository = new TarefaRepository();

function salvar() {
    const inputDescricao = document.getElementById('descricao');
    const descricao = inputDescricao.value;
    const tarefa = { descricao, pronta: false };
    tarefaRepository.create(tarefa).then((resultado) => {
        tarefa.id = resultado;
        const linhaTabela = criaLinhaTabela(tarefa);
        addItensNaTabela(linhaTabela);
        inputDescricao.value = '';
    }).catch((error) => {
        alert(error);
    })
}

function listagemDeTarefas() {
    tarefaRepository.list().then(tarefas => {
        montaTabela(tarefas);
    }).catch(error => {
        alert(error);
    })
}

function montaTabela(tarefas) {
    for (let i = 0; i < tarefas.length; i++) {
        const tarefa = tarefas[i];
        const linhaTabela = criaLinhaTabela(tarefa);
        addItensNaTabela(linhaTabela);
    }
}

function addItensNaTabela(linhaDeTabela) {
    const corpoTabela = document.getElementsByTagName('tbody')[0];
    corpoTabela.append(linhaDeTabela);
}

function criaLinhaTabela(tarefa) {
    const linhaTabela = criaLinha(tarefa);
    const celulaDescricao = criaCedulaDescricao(tarefa);
    linhaTabela.append(celulaDescricao);
    const celulaPronto = criaCheckBoxUpdatePronta(tarefa);
    linhaTabela.append(celulaPronto);
    return linhaTabela;
}

function criaLinha() {
    return document.createElement('tr');
}

function criaCedulaDescricao(tarefa) {
    const celulaDescricao = document.createElement('td');
    celulaDescricao.append(document.createTextNode(tarefa.descricao));
    return celulaDescricao;
}

function criaCheckBoxUpdatePronta(tarefa) {
    const celulaPronto = document.createElement('td');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = tarefa.pronta;
    checkBox.onchange = (ev) => {
        tarefa.pronta = ev.target.checked;
        tarefaRepository.update(tarefa, tarefa.id);
    }
    celulaPronto.append(checkBox);
    return celulaPronto;
}

listagemDeTarefas();