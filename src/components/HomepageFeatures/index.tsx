import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Recursos para Migrantes',
    Svg: require('@site/static/img/undraw_online-information_hhp2.svg').default,
    description: (
      <>
        Desde cómo tramitar tu residencia hasta tips para adaptarte a Uruguay: todo explicado de forma clara, con ejemplos reales.
      </>
    ),
  },
  {
    title: 'Guías y Herramientas Útiles',
    Svg: require('@site/static/img/undraw_travelers_kud9.svg').default,
    description: (
      <>
        Accedé a guías prácticas, calculadoras, enlaces oficiales y contenido que te acompaña en tu proceso migratorio.
      </>
    ),
  },
  {
    title: 'Acompañamiento Real',
    Svg: require('@site/static/img/undraw_interview_yz52.svg').default,
    description: (
      <>
        No estás solo. Compartimos experiencias reales, historias de migración y un espacio donde te podés informar y sentir acompañado.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={clsx(styles.featureCard, 'text--center')}>
        <Svg className={styles.featureSvg} role="img" />
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDesc}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          ¿Qué encontrás en este sitio?
        </Heading>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}