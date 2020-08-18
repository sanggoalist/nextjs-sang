import Head from "next/head";
import appStyles from "../styles/app.module.scss";
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>

      <main>
        <h1 className={appStyles.heading2Xl}>
          Welcome to <a href="https://nextjs.org">Sang.js!</a>
        </h1>
      </main>
    </div>
  );
}
