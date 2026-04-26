import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Head from '@docusaurus/Head';

import styles from './index.module.css';

const SITE_URL = 'https://blog.araelespinosa.me';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'La Wiki de Arael Espinosa',
      description:
        'Guía práctica sobre migración a Uruguay — trámites de residencia, cédula, banca y estadísticas oficiales sobre inmigración.',
      inLanguage: 'es',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Arael Espinosa',
      url: SITE_URL,
      sameAs: [
        'https://instagram.com/araeal_espinosa',
        'https://youtube.com/@elvlogdepaco',
        'https://tiktok.com/@arael_espinosa',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'gestoria@araelespinosa.me',
        availableLanguage: 'Spanish',
      },
    },
  ],
};

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="La Wiki de Arael Espinosa"
      description="Guía práctica sobre migración a Uruguay — trámites de residencia, cédula, banca y estadísticas oficiales sobre inmigración, explicados en detalle.">
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
