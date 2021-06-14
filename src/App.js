import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Login from './Components/login';
import UserProvider from './Context/userContext';
import Register from './Components/register'
import Products from './Components/products'
import ProductInformation from './Components/ProductInformation';
import AddProduct from './Components/addProduct';
import Recuperar from './Components/recuperar';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter >
          <Route exact path='/' component={Login} />
          <Route exact path='/registro' component={Register} />
          <Route exact path='/product' component={Products} />
          <Route exact path='/recuperar' component={Recuperar} />
          <Route exact path ='/product/:id' component={ProductInformation} />
          <Route exact path ='/create' component={AddProduct} />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
