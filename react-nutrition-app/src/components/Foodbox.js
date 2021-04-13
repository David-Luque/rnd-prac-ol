import React from 'react';

const Foodbox = (props) => {

    let quantity;

    const saveQuantity = (newQuantity)=>{
        quantity = newQuantity
    };

    const sendFood = ()=>{
        const {name, calories} = props 
        const theFood = {
            name,
            calories,
            quantity
        }
        props.addInTodaysFood(theFood)
    };


    return (
        <div className="box">
            <article className="media">
                <div className="media-left">
                <figure className="image is-64x64">
                    <img src={props.image} alt={props.name}/>
                </figure>
                </div>
                <div className="media-content">
                <div className="content">
                    <p>
                    <strong>{props.name}</strong> <br />
                    <small>{props.calories} cal</small>
                    </p>
                </div>
                </div>
                <div className="media-right">
                <div className="field has-addons">
                    <div className="control">
                        <input className="input" type="number" onChange={(e)=>{saveQuantity(e.target.value)}} />
                    </div>
                    <div className="control">
                        <button className="button is-info" onClick={sendFood} >
                            +
                        </button>
                    </div>
                </div>
                </div>
            </article>
        </div>
    )
};

export default Foodbox;