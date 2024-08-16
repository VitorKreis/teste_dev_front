import { useEffect, useState } from 'react';
import axios from 'axios';

interface Item {
    id: string;
    name: string;
    description: string;
}

interface ItemListProps {
    onEdit: (item: Item) => void;
}

function ItemList({ onEdit }: ItemListProps) {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
    axios.get<Item[]>('http://localhost:3000/item')
        .then(response => setItems(response.data))
        .catch(error => console.error('Erro ao buscar itens:', error));
  }, []);

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:3000/item/${id}`)
      .then(() => setItems(items.filter(item => item.id !== id)))
      .catch(error => console.error('Erro ao deletar item:', error));
  };

  return (
    <div>
      <h2>Lista de Itens</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => onEdit(item)}>Editar</button>
            <button onClick={() => handleDelete(item.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;

