import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import Home from './pages/Home';
import Login from './pages/Login';
import Error404 from './pages/Error404';
import Layout from './components/Layout'
import { QueryClient, QueryClientProvider } from 'react-query';
import ContextProvider from './context';
import { ReactQueryDevtools } from 'react-query/devtools'

let history = createBrowserHistory();
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <Router history={history}>
          <Layout>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/login" component={Login} exact />
              <Route component={Error404} exact />
            </Switch>
          </Layout>
        </Router>
      </ContextProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
