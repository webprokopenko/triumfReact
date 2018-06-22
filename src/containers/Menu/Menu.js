import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Menu extends Component{
    
    render(){
        return(
        <p>
            <NavLink 
                to='/eth'
                exact='exact'
                activeClassName>Ethereum</NavLink>
            <NavLink 
                to='/btc'
                exact='exact'
                activeClassName>Bitcoin</NavLink>
            <NavLink 
                to='/transactions'
                exact='exact'
                activeClassName>Transactions ETH</NavLink>
        </p>
        )
    }
}

export default Menu;