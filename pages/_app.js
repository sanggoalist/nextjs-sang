import "../styles/global.scss";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "../store";

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
