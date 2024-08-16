
import { useState } from 'react';
import ItemList from './ItensList';
import ItemForm from './ItensForm';
import "./App.css"

interface Item {
  id: string;
  name: string;
  description: string;
}

function App() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="container">
      <h1>Gerenciador de Itens</h1>
      <ItemForm item={selectedItem} />
      <ItemList onEdit={setSelectedItem}  />
    </div>
  );
}

export default App;


