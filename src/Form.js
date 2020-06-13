import React from 'react';

function OrderForm(){
    return (
        <>
            <form>
                <label htmlFor='name'><span>Name: </span>
                    <input type='text' id='name' name='name' placeholder='Enter Your Name' />
                </label>
                <label htmlFor='pizza-size'><span>Size: </span>
                    <select id='pizza-size' name='pizzaSize'>
                        <option>--Please Choose Your Size--</option>
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>
                        <option value='xLarge'>X-Large</option>
                    </select>
                </label>
                <h3>Choose Your Toppings!</h3>
                <label htmlFor='pepperoni'>
                    <input type='checkbox' name='pepperoni' id='pepperoni' checked={false} /><span>Pepperoni</span>
                </label>
            </form>
        </>
    )
}

export default OrderForm