import { useState } from 'react'
import '../Styles/App.css';
import ModifierInput from '../Components/ModifierInput'

function App() {
  const [strMod, setStrMod] = useState(0)
  
  return (
    <div>
      <ModifierInput strMod={strMod} changeStrMod={setStrMod} />
    </div>
  );
}

export default App;
