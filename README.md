# Challenge 08 - Árbol Binario de Búsqueda

Proyecto para el curso de Estructuras de Datos y Algoritmos. Implementación interactiva de un Árbol Binario de Búsqueda (BST) en React con visualización gráfica de nodos y cálculo de recorridos en tiempo real.

## Integrante
- **Maycol Leon** - msleon18

## Descripción
Plataforma visual que permite construir y manipular un Árbol Binario de Búsqueda. Incluye operaciones básicas de inserción y búsqueda de nodos, así como la generación automática de los recorridos principales de la estructura.

## Tecnologías usadas
- **Frontend:** React + Vite
- **Visualización:** react-d3-tree
- **Lenguaje:** JavaScript (ES6+)

## Estructura del proyecto
- `src/App.jsx`: Contiene las clases lógicas `Node` y `BinarySearchTree`, el mapeo de datos a formato D3, los componentes de interfaz y el manejo de estado.
- `src/main.jsx`: Punto de entrada principal de la aplicación en React.

## Funcionalidades implementadas
- **Inserción de nodos:** Permite agregar nuevos números garantizando la propiedad del BST (menores a la izquierda, mayores a la derecha).
- **Búsqueda:** Valida la presencia de un elemento dentro del árbol.
- **Recorridos del árbol:**
  - **PreOrder:** Raíz -> Izquierda -> Derecha
  - **InOrder:** Izquierda -> Raíz -> Derecha (muestra valores ordenados)
  - **PostOrder:** Izquierda -> Derecha -> Raíz
- **Visualización interactiva:** Renderizado dinámico del gráfico del árbol jerárquico.

## Cómo correr en local

1. Clonar el repositorio o situarse en la carpeta del proyecto:
```bash
cd challenge-08