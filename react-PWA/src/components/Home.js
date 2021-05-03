import React from 'react';
import { Link } from 'react-router-dom'

const home = ()=>{
    return(
        <div className="App">
            <Link to='/beers'>
                <section>
                <img src={require("../assets/beers.png")} alt="beers selection"/>
                <h2>All beers</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula purus at maximus tincidunt. Integer nec gravida enim. Aenean pellentesque viverra libero at efficitur. Proin at nulla viverra, ornare lacus. 
                </p>
                </section>
            </Link>
            
            <Link to='/random-beer'>
                <section>
                <img src={require("../assets/random-beer.png")} alt="beer taps" />
                <h2>Random beer</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula purus at maximus tincidunt. Integer nec gravida enim. Aenean pellentesque viverra libero at efficitur. Proin at nulla viverra, ornare lacus. 
                </p>
                </section>
            </Link>
            
            <Link to='/new-beer'>
                <section>
                <img src={require("../assets/new-beer.png")} alt="beer glass" />
                <h2>New beer</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula purus at maximus tincidunt. Integer nec gravida enim. Aenean pellentesque viverra libero at efficitur. Proin at nulla viverra, ornare lacus. 
                </p>
                </section>
            </Link>
        </div>
    );
};

export default home;