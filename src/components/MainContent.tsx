import React from 'react';
import BandejaIngresantes from './Tables/bandeja-ingresantes';
import BandejaLegajos from './Tables/bandeja-legajos';
import BandejaDocumentos from './Tables/bandeja-documentos';

interface MainContentProps {
  selectedMenuItem: string;
}

const MainContent: React.FC<MainContentProps> = ({ selectedMenuItem }) => {
  
  if (selectedMenuItem === 'bandeja-ingresantes') {
    return (
      <BandejaIngresantes selectedMenuItem={getPageTitle(selectedMenuItem)} />
    )
  }
  if (selectedMenuItem === 'bandeja-legajos') {
    return (
      <BandejaLegajos selectedMenuItem={getPageTitle(selectedMenuItem)} />
    )
  }
  if (selectedMenuItem === 'bandeja-documentos') {
    return (
      <BandejaDocumentos selectedMenuItem={getPageTitle(selectedMenuItem)} />
    )
  }

};

function getPageTitle(selectedMenuItem: string): string {
  const titles: { [key: string]: string } = {
    'sigafip': 'SIGAFIP',
    'fiscalizacion-posterior': 'Fiscalización Posterior',
    'bandeja-ingresantes': 'Bandeja de Ingresantes',
    'bandeja-legajos': 'Bandeja de Legajos por Fiscalizar',
    'bandeja-documentos': 'Bandeja de Documentos por Fiscalizar',
    'consultas': 'Consultas',
    'dashboard': 'Dashboard'
  };
  return titles[selectedMenuItem] || 'Página';
}

export default MainContent;
