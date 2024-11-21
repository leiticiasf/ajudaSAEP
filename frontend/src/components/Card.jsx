import React, { useState } from 'react';
import gato from "../assets/gifs.gif";

function Card({ livro, buscarLivros }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLiv, setEditedLiv] = useState({ ...livro });
  const [isAluguelModalOpen, setIsAluguelModalOpen] = useState(false);
  const [aluguelData, setAluguelData] = useState({
    cpf_cliente: '',
    data_retirada: '',
    data_prevista_entrega: ''
  });

  const alterarStatus = async (novoStatus) => {
    if (novoStatus === 'emprestado') {
      setIsAluguelModalOpen(true);
    } else {
      await atualizarLivro(novoStatus);
    }
  };

  const atualizarLivro = async (novaStatus, dadosAluguel = null) => {
    const body = { ...livro, status: novaStatus };
    if (dadosAluguel) {
      body.cpf_cliente = dadosAluguel.cpf_cliente;
      body.data_retirada = dadosAluguel.data_retirada;
      body.data_prevista_entrega = dadosAluguel.data_prevista_entrega;
    }
    await fetch(`http://localhost:3000/livros/${livro.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    buscarLivros();
  };

  const salvarAluguel = async () => {
    await atualizarLivro('emprestado', aluguelData);
    setIsAluguelModalOpen(false);
    setAluguelData({ cpf_cliente: '', data_retirada: '', data_prevista_entrega: '' });
  };

  const editarLivro = async () => {
    await fetch(`http://localhost:3000/livros/${livro.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedCar)
    });
    buscarLivros();
    setIsEditing(false);
  };

  const deletarLivro = async () => {
    const confirmed = window.confirm("Tem certeza de que deseja deletar este livro?");
    if (confirmed) {
      await fetch(`http://localhost:3000/livros/${livro.id}`, { method: 'DELETE' });
      buscarLivros();
    }
  };

  return (
    <div className="card">
      <h3>{livro.modelo}</h3>
      <p>Cor: {livro.cor}</p>
      <p>KM: {livro.km}</p>
      <p>Placa: {livro.placa}</p>
      <p>Situação: {livro.status}</p>
      {livro.status === 'uso' && (
        <>
          <button onClick={() => alterarStatus('emprestado')}>Alugar</button>
          <button onClick={() => alterarStatus('manutencao')}>Manutenção</button>
        </>
      )}
      {livro.status === 'emprestado' && (
        <button onClick={() => alterarStatus('uso')}>Devolver</button>
      )}
      {livro.status === 'manutencao' && (
        <button onClick={() => alterarStatus('uso')}>Finalizar Manutenção</button>
      )}
      {isEditing && (
        <div>
          <input
            value={editedLiv.modelo}
            onChange={(e) => setEditedLiv({ ...editedLiv, modelo: e.target.value })}
          />
          <input
            value={editedLiv.cor}
            onChange={(e) => setEditedCar({ ...editedLiv, cor: e.target.value })}
          />
          <input
            type="number"
            value={editedLiv.km}
            onChange={(e) => setEditedLiv({ ...editedLiv, km: parseInt(e.target.value) })}
          />
          <input
            value={editedLiv.placa}
            onChange={(e) => setEditedLiv({ ...editedLiv, placa: e.target.value })}
          />
          <button onClick={livro}>Salvar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      )}
      {!isEditing && (
        <>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={livro}>Deletar</button>
        </>
      )}
      {isAluguelModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Registrar Aluguel</h2>
            <input
              placeholder="CPF do Cliente"
              value={aluguelData.cpf_cliente}
              onChange={(e) => setAluguelData({ ...aluguelData, cpf_cliente: e.target.value })}
            />
            <input
              type="date"
              value={aluguelData.data_retirada}
              onChange={(e) => setAluguelData({ ...aluguelData, data_retirada: e.target.value })}
            />
            <input
              type="date"
              value={aluguelData.data_prevista_entrega}
              onChange={(e) => setAluguelData({ ...aluguelData, data_prevista_entrega: e.target.value })}
            />
            <button onClick={salvarAluguel}>Confirmar Aluguel</button>
            <button onClick={() => setIsAluguelModalOpen(false)}>Cancelar</button>
          </div>
          
        </div>
      )}
    </div>
    
  );
}

export default Card;


