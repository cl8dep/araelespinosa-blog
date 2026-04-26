import React, {useState} from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

const COLOR_IMMIGRANT = '#1a6496';
const COLOR_NATIVE = '#a8c8e8';

const TABS = [
  {id: 'labor', label: 'Mercado laboral'},
  {id: 'sex', label: 'Por sexo'},
  {id: 'education', label: 'Nivel educativo'},
  {id: 'sector', label: 'Sector de actividad'},
  {id: 'occupation', label: 'Tipo de ocupación'},
  {id: 'other', label: 'Otros indicadores'},
];

const LABOR_DATA = [
  {indicator: 'Actividad', immigrant: 78.8, native: 61.8},
  {indicator: 'Empleo', immigrant: 69.4, native: 56.2},
  {indicator: 'Desempleo', immigrant: 12.0, native: 8.9},
  {indicator: 'Subempleo', immigrant: 10.9, native: 10.1},
];

const SEX_DATA = [
  {group: 'Mujer — Actividad', immigrant: 69.7, native: 56.9},
  {group: 'Varón — Actividad', immigrant: 87.8, native: 69.1},
  {group: 'Mujer — Empleo', immigrant: 57.0, native: 49.4},
  {group: 'Varón — Empleo', immigrant: 81.4, native: 63.4},
  {group: 'Mujer — Desempleo', immigrant: 18.0, native: 10.7},
  {group: 'Varón — Desempleo', immigrant: 7.3, native: 7.4},
];

const EDUCATION_DATA = [
  {level: 'Terciaria completa', immigrant: 50.4, native: 17.9},
  {level: 'Terciaria incompleta', immigrant: 12.5, native: 10.3},
  {level: 'Ed. media sup. completa', immigrant: 24.4, native: 11.7},
];

const SECTOR_DATA = [
  {sector: 'Comercio', immigrant: 21.0, native: 17.6},
  {sector: 'Serv. salud humana', immigrant: 10.7, native: 9.0},
  {sector: 'Ind. manufactureras', immigrant: 10.2, native: 10.0},
  {sector: 'Alojamiento y comida', immigrant: 7.6, native: 3.7},
  {sector: 'Transporte', immigrant: 7.4, native: 4.8},
  {sector: 'Informática y comunic.', immigrant: 6.6, native: 2.3},
];

const OCCUPATION_DATA = [
  {type: 'Servicios y comercios', immigrant: 26.2, native: 21.8},
  {type: 'Prof. científicos e intelectuales', immigrant: 19.8, native: 13.1},
  {type: 'Ocupaciones elementales', immigrant: 14.9, native: 14.1},
];

const OTHER_DATA = [
  {indicator: 'Horas semanales promedio', immigrant: 40.1, native: 37.2},
  {indicator: 'Sin seg. social (dependiente)', immigrant: 21.8, native: 23.3},
  {indicator: 'Sin seg. social (cuenta propia)', immigrant: 50.5, native: 62.6},
];

const formatTick = (v: number) => `${v}%`;

function ComparisonChart({
  data,
  xKey,
}: {
  data: {[key: string]: string | number}[];
  xKey: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{top: 8, right: 40, left: 8, bottom: 8}}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={formatTick}
          domain={[0, 'auto']}
          tick={{fontSize: 12}}
        />
        <YAxis
          type="category"
          dataKey={xKey}
          width={180}
          tick={{fontSize: 12}}
        />
        <Tooltip formatter={(v: number) => `${v}%`} />
        <Legend />
        <Bar
          dataKey="immigrant"
          name="Inmigrante reciente"
          fill={COLOR_IMMIGRANT}
          radius={[0, 4, 4, 0]}
        />
        <Bar
          dataKey="native"
          name="Nativo"
          fill={COLOR_NATIVE}
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function ImmigrationStats() {
  const [activeTab, setActiveTab] = useState('labor');

  return (
    <div style={{fontFamily: 'inherit'}}>
      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '24px',
        }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: activeTab === tab.id ? 'none' : '1px solid #ccc',
              background: activeTab === tab.id ? COLOR_IMMIGRANT : 'transparent',
              color: activeTab === tab.id ? '#fff' : 'inherit',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? 600 : 400,
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'labor' && (
        <div>
          <p style={{marginBottom: '16px', fontSize: '14px', color: '#555'}}>
            Tasas de actividad, empleo, desempleo y subempleo según condición
            migratoria (población de 14 años y más, ECH 2022–2024).
          </p>
          <ComparisonChart data={LABOR_DATA} xKey="indicator" />
        </div>
      )}

      {activeTab === 'sex' && (
        <div>
          <p style={{marginBottom: '16px', fontSize: '14px', color: '#555'}}>
            Tasas del mercado laboral por sexo y condición migratoria (14 años y
            más, ECH 2022–2024).
          </p>
          <ComparisonChart data={SEX_DATA} xKey="group" />
        </div>
      )}

      {activeTab === 'education' && (
        <div>
          <p style={{marginBottom: '16px', fontSize: '14px', color: '#555'}}>
            Nivel educativo de la población ocupada según condición migratoria
            (24 años y más, ECH 2022–2024).
          </p>
          <ComparisonChart data={EDUCATION_DATA} xKey="level" />
        </div>
      )}

      {activeTab === 'sector' && (
        <div>
          <p style={{marginBottom: '16px', fontSize: '14px', color: '#555'}}>
            Distribución porcentual de la población ocupada por rama de actividad
            y condición migratoria (ECH 2022–2024).
          </p>
          <ComparisonChart data={SECTOR_DATA} xKey="sector" />
        </div>
      )}

      {activeTab === 'occupation' && (
        <div>
          <p style={{marginBottom: '16px', fontSize: '14px', color: '#555'}}>
            Distribución porcentual de la población ocupada por tipo de ocupación
            y condición migratoria (ECH 2022–2024).
          </p>
          <ComparisonChart data={OCCUPATION_DATA} xKey="type" />
        </div>
      )}

      {activeTab === 'other' && (
        <div>
          <p style={{marginBottom: '16px', fontSize: '14px', color: '#555'}}>
            Promedio de horas semanales trabajadas y prevalencia de trabajo sin
            acceso a la seguridad social según condición migratoria (ECH
            2022–2024).
          </p>
          <ComparisonChart data={OTHER_DATA} xKey="indicator" />
          <p
            style={{
              marginTop: '12px',
              fontSize: '13px',
              color: '#777',
              fontStyle: 'italic',
            }}>
            El indicador "Sin seg. social" refiere a la prevalencia de trabajo
            sin acceso a la seguridad social: para ocupados dependientes y para
            trabajadores por cuenta propia respectivamente.
          </p>
        </div>
      )}
    </div>
  );
}
