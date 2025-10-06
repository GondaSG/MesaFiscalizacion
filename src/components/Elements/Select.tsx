import { listDependencia } from '../../api/dependenciaApi';
import React from 'react';
import { useEffect,useState } from 'react';
import {Dependencia} from '../../Interfaces/Dependencia';
interface DependenciaParam {
    selectValor: (optionId:string) => void;
    dependencia: string;
    isDisableDependencia:Boolean;
}
const DependenciaSelect:React.FC<DependenciaParam> = ({dependencia,selectValor,isDisableDependencia}) => {
    //const [dependencia, setDependencia] = useState('');
    const [dependencias, setDependencias] = useState<Dependencia[]>([]);
    useEffect(() => {
        if(dependencias.length == 0){
            const getDependencia = async ()=>{
                const data = await listDependencia();
                if(data && data.success && data.data){
                    setDependencias(data.data);
                }
                else {
                    alert(data.menssage || 'Error al cargar las dependencias');
                }
            }
            getDependencia();
        }
    }, []);

  const changeValue = (value: string) =>{
    console.log(value)
    selectValor(value)
  }
  return (
        <select
            value={dependencia}
            onChange={(e) => changeValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            disabled={isDisableDependencia}
        >
            
            <option value="0">Seleccione</option>
            {dependencias.map((item) => (
                <option value={item.id}>{item.name}</option>
            ))}
        
        </select>
  );
};

export default DependenciaSelect;