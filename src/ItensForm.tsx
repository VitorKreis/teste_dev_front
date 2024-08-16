import React, { useState } from 'react';
import axios from 'axios';

interface Item {
  id: string;
  name: string;
  description: string;
}

interface ItemFormProps {
  item: Item | null;
  
}

function ItemForm({ item}: ItemFormProps) {
  const [name, setName] = useState<string>(item ? item.name : '');
  const [description, setDescription] = useState<string>(item ? item.description : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (item && item.id) {
      axios.put<Item>(`http://localhost:3000/item/${item.id}`, { name, description })
        .catch(error => console.error('Erro ao atualizar item:', error));
    } else {
      axios.post<Item>('http://localhost:3000/item',  { name, description })
        .catch(error => console.error('Erro ao adicionar item:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do item"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descriçao do item"
      />
      <button type="submit">{item ? 'Atualizar' : 'Adicionar'}</button>
    </form>
  );
}

export default ItemForm;
