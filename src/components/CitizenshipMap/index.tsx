import React, {useState} from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {scaleLog} from 'd3-scale';

const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ISO numeric → count mapping
const DATA: {name: string; iso3: string; isoNumeric: string; count: number}[] =
  [
    {name: 'Venezuela', iso3: 'VEN', isoNumeric: '862', count: 3119},
    {name: 'Cuba', iso3: 'CUB', isoNumeric: '192', count: 2880},
    {name: 'Argentina', iso3: 'ARG', isoNumeric: '032', count: 1597},
    {name: 'República Dominicana', iso3: 'DOM', isoNumeric: '214', count: 1334},
    {name: 'Perú', iso3: 'PER', isoNumeric: '604', count: 875},
    {name: 'Brasil', iso3: 'BRA', isoNumeric: '076', count: 659},
    {name: 'Colombia', iso3: 'COL', isoNumeric: '170', count: 350},
    {name: 'España', iso3: 'ESP', isoNumeric: '724', count: 293},
    {name: 'Chile', iso3: 'CHL', isoNumeric: '152', count: 166},
    {name: 'Italia', iso3: 'ITA', isoNumeric: '380', count: 152},
    {name: 'Paraguay', iso3: 'PRY', isoNumeric: '600', count: 149},
    {name: 'Estados Unidos', iso3: 'USA', isoNumeric: '840', count: 125},
    {name: 'China', iso3: 'CHN', isoNumeric: '156', count: 89},
    {name: 'Ecuador', iso3: 'ECU', isoNumeric: '218', count: 84},
    {name: 'México', iso3: 'MEX', isoNumeric: '484', count: 81},
    {name: 'Bolivia', iso3: 'BOL', isoNumeric: '068', count: 79},
    {name: 'Francia', iso3: 'FRA', isoNumeric: '250', count: 72},
    {name: 'Nigeria', iso3: 'NGA', isoNumeric: '566', count: 66},
    {name: 'Pakistán', iso3: 'PAK', isoNumeric: '586', count: 62},
    {name: 'Siria', iso3: 'SYR', isoNumeric: '760', count: 41},
    {name: 'El Salvador', iso3: 'SLV', isoNumeric: '222', count: 44},
    {name: 'Alemania', iso3: 'DEU', isoNumeric: '276', count: 51},
    {name: 'Rusia', iso3: 'RUS', isoNumeric: '643', count: 170},
    {name: 'Turquía', iso3: 'TUR', isoNumeric: '792', count: 28},
    {name: 'Suiza', iso3: 'CHE', isoNumeric: '756', count: 31},
    {name: 'Honduras', iso3: 'HND', isoNumeric: '340', count: 30},
    {name: 'Ucrania', iso3: 'UKR', isoNumeric: '804', count: 27},
    {name: 'Armenia', iso3: 'ARM', isoNumeric: '051', count: 24},
    {name: 'Camerún', iso3: 'CMR', isoNumeric: '120', count: 23},
    {name: 'India', iso3: 'IND', isoNumeric: '356', count: 23},
    {name: 'Haití', iso3: 'HTI', isoNumeric: '332', count: 23},
    {name: 'Sudáfrica', iso3: 'ZAF', isoNumeric: '710', count: 21},
    {name: 'Guatemala', iso3: 'GTM', isoNumeric: '320', count: 20},
    {name: 'Polonia', iso3: 'POL', isoNumeric: '616', count: 19},
    {name: 'Nicaragua', iso3: 'NIC', isoNumeric: '558', count: 16},
    {name: 'Canadá', iso3: 'CAN', isoNumeric: '124', count: 16},
    {name: 'Chile', iso3: 'CHL', isoNumeric: '152', count: 166},
    {name: 'Líbano', iso3: 'LBN', isoNumeric: '422', count: 21},
    {name: 'Hungría', iso3: 'HUN', isoNumeric: '348', count: 12},
    {name: 'Irán', iso3: 'IRN', isoNumeric: '364', count: 13},
    {name: 'Egipto', iso3: 'EGY', isoNumeric: '818', count: 13},
    {name: 'Marruecos', iso3: 'MAR', isoNumeric: '504', count: 13},
    {name: 'Bélgica', iso3: 'BEL', isoNumeric: '056', count: 13},
    {name: 'Costa Rica', iso3: 'CRI', isoNumeric: '188', count: 13},
    {name: 'Inglaterra / Gran Bretaña', iso3: 'GBR', isoNumeric: '826', count: 18},
    {name: 'Jordania', iso3: 'JOR', isoNumeric: '400', count: 11},
    {name: 'Palestina', iso3: 'PSE', isoNumeric: '275', count: 11},
    {name: 'Angola', iso3: 'AGO', isoNumeric: '024', count: 6},
    {name: 'Argelia', iso3: 'DZA', isoNumeric: '012', count: 6},
    {name: 'Finlandia', iso3: 'FIN', isoNumeric: '246', count: 6},
    {name: 'Kazajistán', iso3: 'KAZ', isoNumeric: '398', count: 6},
    {name: 'Lituania', iso3: 'LTU', isoNumeric: '440', count: 6},
    {name: 'Puerto Rico', iso3: 'PRI', isoNumeric: '630', count: 6},
    {name: 'República Checa', iso3: 'CZE', isoNumeric: '203', count: 6},
    {name: 'Australia', iso3: 'AUS', isoNumeric: '036', count: 5},
    {name: 'Bielorrusia', iso3: 'BLR', isoNumeric: '112', count: 5},
    {name: 'Ghana', iso3: 'GHA', isoNumeric: '288', count: 4},
    {name: 'Grecia', iso3: 'GRC', isoNumeric: '300', count: 4},
    {name: 'Austria', iso3: 'AUT', isoNumeric: '040', count: 4},
    {name: 'Suecia', iso3: 'SWE', isoNumeric: '752', count: 4},
    {name: 'Panamá', iso3: 'PAN', isoNumeric: '591', count: 8},
    {name: 'Portugal', iso3: 'PRT', isoNumeric: '620', count: 8},
    {name: 'Israel', iso3: 'ISR', isoNumeric: '376', count: 8},
    {name: 'Uzbekistán', iso3: 'UZB', isoNumeric: '860', count: 8},
    {name: 'Rumanía', iso3: 'ROU', isoNumeric: '642', count: 8},
    {name: 'Sierra Leona', iso3: 'SLE', isoNumeric: '694', count: 8},
    {name: 'Domínica', iso3: 'DMA', isoNumeric: '212', count: 8},
    {name: 'Nepal', iso3: 'NPL', isoNumeric: '524', count: 3},
    {name: 'Noruega', iso3: 'NOR', isoNumeric: '578', count: 3},
    {name: 'Irlanda', iso3: 'IRL', isoNumeric: '372', count: 3},
    {name: 'Senegal', iso3: 'SEN', isoNumeric: '686', count: 3},
    {name: 'Túnez', iso3: 'TUN', isoNumeric: '788', count: 3},
    {name: 'Corea del Sur', iso3: 'KOR', isoNumeric: '410', count: 3},
    {name: 'Dinamarca', iso3: 'DNK', isoNumeric: '208', count: 3},
    {name: 'Eslovaquia', iso3: 'SVK', isoNumeric: '703', count: 3},
    {name: 'Bosnia y Herzegovina', iso3: 'BIH', isoNumeric: '070', count: 2},
    {name: 'Bulgaria', iso3: 'BGR', isoNumeric: '100', count: 2},
    {name: 'Congo', iso3: 'COG', isoNumeric: '178', count: 2},
    {name: 'Filipinas', iso3: 'PHL', isoNumeric: '608', count: 2},
    {name: 'Guyana', iso3: 'GUY', isoNumeric: '328', count: 2},
    {name: 'Indonesia', iso3: 'IDN', isoNumeric: '360', count: 2},
    {name: 'Kuwait', iso3: 'KWT', isoNumeric: '414', count: 2},
    {name: 'Libia', iso3: 'LBY', isoNumeric: '434', count: 2},
    {name: 'Japón', iso3: 'JPN', isoNumeric: '392', count: 2},
    {name: 'Azerbaiyán', iso3: 'AZE', isoNumeric: '031', count: 2},
    {name: 'Bangladesh', iso3: 'BGD', isoNumeric: '050', count: 2},
    {name: 'Afganistán', iso3: 'AFG', isoNumeric: '004', count: 2},
    {name: 'Albania', iso3: 'ALB', isoNumeric: '008', count: 2},
    {name: 'Yemen', iso3: 'YEM', isoNumeric: '887', count: 2},
    {name: 'Tanzania', iso3: 'TZA', isoNumeric: '834', count: 1},
    {name: 'Vietnam', iso3: 'VNM', isoNumeric: '704', count: 1},
    {name: 'Andorra', iso3: 'AND', isoNumeric: '020', count: 1},
    {name: 'Arabia Saudita', iso3: 'SAU', isoNumeric: '682', count: 1},
    {name: 'Croacia', iso3: 'HRV', isoNumeric: '191', count: 1},
    {name: 'Etiopía', iso3: 'ETH', isoNumeric: '231', count: 1},
    {name: 'Georgia', iso3: 'GEO', isoNumeric: '268', count: 1},
    {name: 'Irak', iso3: 'IRQ', isoNumeric: '368', count: 1},
    {name: 'Jamaica', iso3: 'JAM', isoNumeric: '388', count: 1},
    {name: 'Kenia', iso3: 'KEN', isoNumeric: '404', count: 1},
    {name: 'Luxemburgo', iso3: 'LUX', isoNumeric: '442', count: 1},
    {name: 'Malasia', iso3: 'MYS', isoNumeric: '458', count: 1},
    {name: 'Mozambique', iso3: 'MOZ', isoNumeric: '508', count: 1},
    {name: 'Surinam', iso3: 'SUR', isoNumeric: '740', count: 1},
    {name: 'Tayikistán', iso3: 'TJK', isoNumeric: '762', count: 1},
    {name: 'República de Burundi', iso3: 'BDI', isoNumeric: '108', count: 1},
  ];

// Deduplicate by isoNumeric (some entries like Chile appear twice, keep max)
const countByNumeric: Record<string, number> = {};
const nameByNumeric: Record<string, string> = {};
for (const d of DATA) {
  const existing = countByNumeric[d.isoNumeric] ?? 0;
  if (d.count > existing) {
    countByNumeric[d.isoNumeric] = d.count;
    nameByNumeric[d.isoNumeric] = d.name;
  }
}

const TOP10 = [...DATA]
  .sort((a, b) => b.count - a.count)
  .filter(
    (d, i, arr) => arr.findIndex((x) => x.iso3 === d.iso3) === i,
  )
  .slice(0, 10);

const colorScale = scaleLog<string>()
  .domain([1, 3119])
  .range(['#cce5ff', '#003d7a'])
  .clamp(true);

function WorldMap() {
  const [tooltip, setTooltip] = useState<{
    name: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  return (
    <div style={{position: 'relative'}}>
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            left: tooltip.x + 12,
            top: tooltip.y - 8,
            background: 'rgba(0,0,0,0.8)',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: 4,
            fontSize: 13,
            pointerEvents: 'none',
            zIndex: 1000,
            whiteSpace: 'nowrap',
          }}>
          <strong>{tooltip.name}</strong>
          <br />
          {tooltip.count.toLocaleString('es-UY')} cartas
        </div>
      )}
      <ComposableMap
        projectionConfig={{scale: 140}}
        style={{width: '100%', height: 'auto'}}>
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({geographies}) =>
              geographies.map((geo) => {
                const numericId = String(geo.id).padStart(3, '0');
                const count = countByNumeric[numericId];
                const name = nameByNumeric[numericId];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={count ? colorScale(count) : '#e8e8e8'}
                    stroke="#fff"
                    strokeWidth={0.4}
                    style={{
                      default: {outline: 'none'},
                      hover: {
                        fill: count ? '#f4a261' : '#d0d0d0',
                        outline: 'none',
                        cursor: count ? 'pointer' : 'default',
                      },
                      pressed: {outline: 'none'},
                    }}
                    onMouseEnter={(e) => {
                      if (count) {
                        setTooltip({
                          name: name,
                          count,
                          x: e.clientX,
                          y: e.clientY,
                        });
                      }
                    }}
                    onMouseMove={(e) => {
                      if (count) {
                        setTooltip((prev) =>
                          prev
                            ? {...prev, x: e.clientX, y: e.clientY}
                            : null,
                        );
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 4,
          fontSize: 12,
          color: '#666',
        }}>
        <span>Menos</span>
        <div
          style={{
            width: 160,
            height: 12,
            background:
              'linear-gradient(to right, #cce5ff, #003d7a)',
            borderRadius: 2,
          }}
        />
        <span>Más</span>
        <span style={{marginLeft: 8}}>(escala logarítmica)</span>
      </div>
    </div>
  );
}

function TopChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={TOP10}
        layout="vertical"
        margin={{top: 0, right: 24, left: 8, bottom: 0}}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tickFormatter={(v) => v.toLocaleString('es-UY')} />
        <YAxis type="category" dataKey="name" width={160} tick={{fontSize: 13}} />
        <Tooltip
          formatter={(value: number) => [
            value.toLocaleString('es-UY'),
            'Cartas',
          ]}
        />
        <Bar dataKey="count" fill="#2e86de" radius={[0, 3, 3, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CountryTable() {
  const [query, setQuery] = useState('');
  const allCountries = [...DATA]
    .filter((d, i, arr) => arr.findIndex((x) => x.iso3 === d.iso3) === i)
    .sort((a, b) => b.count - a.count);

  const filtered = allCountries.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar país..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          maxWidth: 320,
          padding: '8px 12px',
          marginBottom: 12,
          border: '1px solid #ccc',
          borderRadius: 4,
          fontSize: 14,
        }}
      />
      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 14}}>
        <thead>
          <tr style={{borderBottom: '2px solid #ddd', textAlign: 'left'}}>
            <th style={{padding: '6px 8px'}}>#</th>
            <th style={{padding: '6px 8px'}}>País</th>
            <th style={{padding: '6px 8px', textAlign: 'right'}}>Cartas</th>
            <th style={{padding: '6px 8px', textAlign: 'right'}}>%</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((d, i) => (
            <tr
              key={d.iso3}
              style={{
                borderBottom: '1px solid #eee',
                background: i % 2 === 0 ? 'transparent' : '#f9f9f9',
              }}>
              <td style={{padding: '5px 8px', color: '#888'}}>
                {allCountries.indexOf(d) + 1}
              </td>
              <td style={{padding: '5px 8px'}}>{d.name}</td>
              <td style={{padding: '5px 8px', textAlign: 'right'}}>
                {d.count.toLocaleString('es-UY')}
              </td>
              <td style={{padding: '5px 8px', textAlign: 'right', color: '#555'}}>
                {((d.count / 13222) * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CitizenshipMap(): React.JSX.Element {
  const [tab, setTab] = useState<'map' | 'chart' | 'table'>('map');

  const tabStyle = (active: boolean) => ({
    padding: '8px 16px',
    border: 'none',
    borderBottom: active ? '2px solid #2e86de' : '2px solid transparent',
    background: 'none',
    cursor: 'pointer',
    fontWeight: active ? 600 : 400,
    color: active ? '#2e86de' : '#555',
    fontSize: 14,
  });

  return (
    <div style={{margin: '16px 0'}}>
      <div
        style={{
          display: 'flex',
          gap: 4,
          borderBottom: '1px solid #eee',
          marginBottom: 16,
        }}>
        <button style={tabStyle(tab === 'map')} onClick={() => setTab('map')}>
          Mapa mundial
        </button>
        <button
          style={tabStyle(tab === 'chart')}
          onClick={() => setTab('chart')}>
          Top 10
        </button>
        <button
          style={tabStyle(tab === 'table')}
          onClick={() => setTab('table')}>
          Tabla completa
        </button>
      </div>

      {tab === 'map' && <WorldMap />}
      {tab === 'chart' && <TopChart />}
      {tab === 'table' && <CountryTable />}
    </div>
  );
}
