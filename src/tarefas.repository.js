class TarefaRepository {

    constructor() {
        this.db = firebase.firestore();
    }

    create = (tarefa) => {
        return new Promise((resolve, reject) => {
            this.db.collection('tarefas').add(tarefa).then(resultado => {
                resolve(resultado.id);
            }).catch(error => {
                reject('Não foi possível cadastrar a tarefa.');
            });
        });
    }

    list = () => {
        return new Promise((resolve, reject) => {
            this.db.collection('tarefas').get().then(querySnapshot => {
                const tarefas = querySnapshot.docs.map(doc => {
                    return { id: doc.id, ...doc.data() };
                });
                resolve(tarefas);
            }).catch(error => {
                reject('Não foi possível buscar as tarefas.');
            })
        })
    }

    update = (tarefa, id) => {
        return new Promise((resolve, reject) => {
            this.db.collection('tarefas').doc(id).update(tarefa).then(resultado => {
                resolve('Tarefa atualizada com sucesso.');
            }).catch(error => {
                reject(error);
            })
        });
    }
}