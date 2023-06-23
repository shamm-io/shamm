import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from '../components/header'
import Footer from '../components/footer'
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import AuthForm from '../components/auth-form';

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Login / Register - Shamm</title>
        <meta name="description" content="A blockchain based crowdfunding platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.backgroundImage}>
        <div className="container lg:pb-[30px] mx-auto body">
          <section>
            <div className='container max-w-5xl mx-auto py-28'>
              <AuthForm />
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AuthPage;