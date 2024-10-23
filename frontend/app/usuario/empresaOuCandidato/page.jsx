// filename: EmpresaOuCandidato.jsx

'use client';
import { useLocalStorage } from '../../context/LocalStorageContext';

export default function EmpresaOuCandidato() {
  const { storedValue, updateStoredValue } = useLocalStorage();
  const parsedValue = typeof storedValue === 'string' ? JSON.parse(storedValue) : storedValue;



  return (
    <div>
      <h1>EmpresaOuCandidatoForm</h1>
      <button>Candidato</button>
      <button>Empresa</button>
      <pre>user id {parsedValue?.user_id}</pre> 
    </div>
  );
}
