import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthticationPage from './pages/AuthenticationPage'
import Layout from "./layout/Layout";
import Homepage from "./pages/Homepage";
import FileContextProvider from "./contexts/FileContext";
import ModalContextProvider from "./contexts/ModalContext";
function App() {
  return (
    <div className="App container">
        <BrowserRouter>
          <Switch>
            <Route path="/auth" component={AuthticationPage} />
            <FileContextProvider> 
              <ModalContextProvider>
                  <Layout>
                        <Route exact path="/" component={Homepage} />
                  </Layout>
                </ModalContextProvider>
              </FileContextProvider>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
