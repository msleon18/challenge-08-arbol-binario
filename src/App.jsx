import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';

// 1. Clases Lógicas del Árbol Binario
class Node {
  constructor(valor) {
    this.valor = valor;
    this.izquierda = null;
    this.derecha = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.raiz = null;
  }

  insertar(valor) {
    const nuevoNodo = new Node(valor);
    if (!this.raiz) {
      this.raiz = nuevoNodo;
      return this;
    }
    let actual = this.raiz;
    while (true) {
      if (valor === actual.valor) return undefined;
      if (valor < actual.valor) {
        if (!actual.izquierda) {
          actual.izquierda = nuevoNodo;
          return this;
        }
        actual = actual.izquierda;
      } else {
        if (!actual.derecha) {
          actual.derecha = nuevoNodo;
          return this;
        }
        actual = actual.derecha;
      }
    }
  }

  buscar(valor, nodo = this.raiz) {
    if (!nodo) return false;
    if (nodo.valor === valor) return true;
    if (valor < nodo.valor) return this.buscar(valor, nodo.izquierda);
    return this.buscar(valor, nodo.derecha);
  }

  preorder(nodo = this.raiz, resultado = []) {
    if (nodo) {
      resultado.push(nodo.valor);
      this.preorder(nodo.izquierda, resultado);
      this.preorder(nodo.derecha, resultado);
    }
    return resultado;
  }

  inorder(nodo = this.raiz, resultado = []) {
    if (nodo) {
      this.inorder(nodo.izquierda, resultado);
      resultado.push(nodo.valor);
      this.inorder(nodo.derecha, resultado);
    }
    return resultado;
  }

  postorder(nodo = this.raiz, resultado = []) {
    if (nodo) {
      this.postorder(nodo.izquierda, resultado);
      this.postorder(nodo.derecha, resultado);
      resultado.push(nodo.valor);
    }
    return resultado;
  }

  // Adapta nuestro árbol a la estructura que requiere react-d3-tree
  toD3Format(nodo = this.raiz) {
    if (!nodo) return null;
    let obj = { name: String(nodo.valor) };
    let children = [];
    if (nodo.izquierda) children.push(this.toD3Format(nodo.izquierda));
    if (nodo.derecha) children.push(this.toD3Format(nodo.derecha));
    if (children.length > 0) obj.children = children;
    return obj;
  }
}

// 2. Componente React Principal
export default function App() {
  const [bst, setBst] = useState(new BinarySearchTree());
  const [d3Data, setD3Data] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [traversals, setTraversals] = useState({ pre: [], in: [], post: [] });

  // Carga inicial de datos (los números del reto)
  useEffect(() => {
    const arbolInicial = new BinarySearchTree();
    const numeros = [25, 15, 50, 10, 22, 35, 70, 12, 18, 44, 66];
    numeros.forEach(num => arbolInicial.insertar(num));
    setBst(arbolInicial);
    actualizarVista(arbolInicial);
  }, []);

  const actualizarVista = (arbol) => {
    setD3Data(arbol.toD3Format());
    setTraversals({
      pre: arbol.preorder(),
      in: arbol.inorder(),
      post: arbol.postorder()
    });
  };

  const handleInsert = (e) => {
    e.preventDefault();
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      bst.insertar(val);
      actualizarVista(bst);
      setInputValue('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const val = parseInt(searchValue);
    if (!isNaN(val)) {
      setSearchResult(bst.buscar(val));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Challenge 08: Árbol Binario de Búsqueda</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleInsert}>
          <input 
            type="number" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Nuevo valor..."
          />
          <button type="submit">Insertar Nodo</button>
        </form>

        <form onSubmit={handleSearch}>
          <input 
            type="number" 
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)} 
            placeholder="Buscar valor..."
          />
          <button type="submit">Buscar</button>
        </form>
        {searchResult !== null && (
          <span style={{ fontWeight: 'bold', color: searchResult ? 'green' : 'red', alignSelf: 'center' }}>
            {searchResult ? '✔ El valor existe' : '❌ No existe'}
          </span>
        )}
      </div>

      <div style={{ marginBottom: '20px', background: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
        <p><strong>PreOrder:</strong> {traversals.pre.join(', ')}</p>
        <p><strong>InOrder:</strong> {traversals.in.join(', ')}</p>
        <p><strong>PostOrder:</strong> {traversals.post.join(', ')}</p>
      </div>

      <div style={{ width: '100%', height: '500px', border: '2px solid #ddd', borderRadius: '8px', backgroundColor: '#fafafa' }}>
        {d3Data ? (
          <Tree 
            data={d3Data} 
            orientation="vertical" 
            translate={{ x: 400, y: 50 }} 
            pathFunc="straight"
          />
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>El árbol está vacío</p>
        )}
      </div>
    </div>
  );
}