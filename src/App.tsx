import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from './components/Provider';
import { Layout } from './layout';
import { Routings } from './router/routings';

const App = () => (
  <Provider>
    <Router>
      <Layout>
        <Routings />
      </Layout>
    </Router>
  </Provider>
);

export { App };
