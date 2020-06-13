import React from "react";
import { Link, Route, Switch, useHistory } from 'react-router-dom'
import OrderForm from './Form'
import styled from 'styled-components'
import Pizza from './Assets/Pizza_Copy.jpg'

const HeaderNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center  
`;

function Home(){
  const history = useHistory()

  return (
    <>
      <div style={{height: '290px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <img style={{width: '70%', height: 'auto', margin: '0 15% 0 15%'}} src={Pizza} />
        <button style={{margin: '-15px'}} onClick={() => {
          history.push('/pizza')
        }}>Pizza Time!</button>
      </div>
    </>
  )
}

const App = () => {
  return (
    <>
      <HeaderNav>
        <h1>Lambda Eats</h1>
        <div>
          <Link to='/'><button>Home</button></Link>
          <Link to='/pizza'><button>Order a Pizza</button></Link>
        </div>
      </HeaderNav>

      <Switch>
        <Route path='/pizza' render={() => {
          return <OrderForm />
        }} />
        <Route path='/' component={Home} />
      </Switch>
    </>
  );
};
export default App;
