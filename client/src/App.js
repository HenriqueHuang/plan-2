import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import Navbar from './subcomponetes/Navbar';
import Home from './componentes/Home';
import Unidade from './componentes/Unidade';
//import Campeonatos from './componentes/Campeonatos';
//import Jogos from './componentes/Jogos';
//import Times from './componentes/Times';
//import Quadras from './componentes/Quadras';
//import Jogadores from './componentes/Jogadores';
import './App.css';

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar/>}>
        <Route index element={<Home/>}/>
        <Route path="/unidades" element={<Unidade/>}/>
        {/*<Route path="/campeonatos" element={<Campeonatos/>}/>
        <Route path="/jogos" element={<Jogos/>}/>
        <Route path="/times" element={<Times/>}/>
        <Route path="/quadras" element={<Quadras/>}/>
        <Route path="/jogadores" element={<Jogadores/>}/>*/}
      </Route>
    )
  )
  
  return (
    <main>
      <RouterProvider router={route}/>
    </main>
  )
}

export default App;
