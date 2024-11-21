import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import gato from '../src/assets/gifs.gif'
import './App.css'
function App() {
  const [livros, setLivros] = useState([]);
  const [Estudantes, setEstudantes] = useState([]);
  const [isAddingLivro, setIsAddingLivro] = useState(false);
  const [isAddingEstudante, setIsAddingEstudante] = useState(false);
  const [novoLivro, setNovoLivro] = useState({
    titulo: '',
     autor: '',
     ano: 0,
     editora: '',
  });
  const [novoEstudante, setNovoEstudante] = useState({
    matricula: '',
    nome_completo: '',
    data_nascimento: '',
    email: '',
    telefone: '',
  });

  const filtroLivrosPorStatus = (status) => livros.filter(livro => livro.status === status);

  function adicionarLivro() {
    setIsAddingLivro(true);
  }

  function adicionarEstudante() {
    setIsAddingEstudante(true);
  }

  const salvarLivro = async () => {
    try {
      await fetch('http://localhost:3000/Livros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...novoLivro, status: 'uso' }),
      });
      setIsAddingLivro(false);
      setNovoLivro({ modelo: '', cor: '', km: 0, placa: '' });
      buscarLivros();
    } catch (error) {
      console.error('Erro ao salvar livro:', error);
    }
  };

  const salvarEstudante = async () => {
    try {
      await fetch('http://localhost:3000/Estudantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoEstudante),
      });
      setIsAddingEstudante(false);
      setNovoEstudante({ matricula: '', nome_completo: '', data_nascimento: '', email: '', telefone: '' });
      buscarEstudantes();
    } catch (error) {
      console.error('Erro ao salvar Estudante:', error);
    }
  };

  const buscarLivros = async () => {
    try {
      const response = await fetch('http://localhost:3000/Livros');
      const data = await response.json();
      setLivros(data);
    } catch (error) {
      console.error('Erro ao buscar Livros:', error);
    }
  };

  const buscarEstudantes = async () => {
    try {
      const response = await fetch('http://localhost:3000/Estudantes');
      const data = await response.json();
      setEstudantes(data);
    } catch (error) {
      console.error('Erro ao buscar Estudantes:', error);
    }
  };

  useEffect(() => {
    buscarLivros();
    buscarEstudantes();
  }, []);

  return (
    <div>
      <header>
        <h1>Aluga Livros</h1>
        <button onClick={adicionarLivro}>Adicionar livro</button>
        <button onClick={adicionarEstudante}>Adicionar Estudante</button>
        <img src={gato} className="gato" alt="" />
      </header>
      <div className="dashboard">
        <div className="coluna-dashboard">
          <h2>Em Uso</h2>
          {filtroLivrosPorStatus('uso').map(livro => (
            <Card key={livro.id} livro={livro} buscarLivros={buscarLivros} Estudantes={Estudantes} />
          ))}
        </div>
        <div className="coluna-dashboard">
          <h2>Emprestados</h2>
          {filtroLivrosPorstatus('emprestado').map(livro => (
            <Card key={livro.id} livro={livro} buscarLivros={buscarLivros} Estudantes={Estudantes} />
          ))}
        </div>
        <div className="coluna-dashboard">
          <h2>Em Manutenção</h2>
          {filtroLivrosPorstatus('manutencao').map(livro => (
            <Card key={livro.id} livro={livro} buscarLivros={buscarLivros} Estudantes={Estudantes} />
          ))}
        </div>
      </div>
      {isAddingLivro && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar livro</h2>
            <input
              placeholder="Modelo"
              value={novoLivro.modelo}
              onChange={(e) => setNovoLivro({ ...novoLivro, modelo: e.target.value })}
            />
            <input
              placeholder="Cor"
              value={novolivro.cor}
              onChange={(e) => setNovoLivro({ ...novoLivro, cor: e.target.value })}
            />
            <input
              type="number"
              placeholder="KM"
              value={novoLivro.km}
              onChange={(e) => setNovoLivro({ ...novoLivro, km: parseInt(e.target.value) })}
            />
            <input
              placeholder="Placa"
              value={novoLivro.placa}
              onChange={(e) => setNovoLivro({ ...novoLivro, placa: e.target.value })}
            />
            <button onClick={salvarLivro}>Salvar</button>
            <button onClick={() => setIsAddingLivro(false)}>Cancelar</button>
          </div>
        </div>
      )}
      {isAddingEstudante && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Estudante</h2>
            <input
              placeholder="matricula"
              value={novoEstudante.matricula}
              onChange={(e) => setNovoEstudante({ ...novoEstudante, matricula: e.target.value })}
            />
            <input
              placeholder="Nome Completo"
              value={novoEstudante.nome_completo}
              onChange={(e) => setNovoEstudante({ ...novoEstudante, nome_completo: e.target.value })}
            />
            <input
              type="date"
              placeholder="Data de Nascimento"
              value={novoEstudante.data_nascimento}
              onChange={(e) => setNovoEstudante({ ...novoEstudante, data_nascimento: e.target.value })}
            />
            <input
              placeholder="Email"
              value={novoEstudante.email}
              onChange={(e) => setNovoEstudante({ ...novoEstudante, email: e.target.value })}
            />
            <input
              placeholder="Telefone"
              value={novoEstudante.telefone}
              onChange={(e) => setNovoEstudante({ ...novoEstudante, telefone: e.target.value })}
            />
            <button onClick={salvarEstudante}>Salvar</button>
            <button onClick={() => setIsAddingEstudante(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


// 