import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import * as yup from 'yup'
import axios from 'axios'

const FlexDiv = styled.div`
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    label {
        margin-top: 10px;
    }
`;

function OrderForm(){
    const [order, setOrder] = useState({
        name: '',
        size: '',
        special: '',
        xtraCheese: false,
        pepperoni: false,
        deluxeMeat: false,
        supreme: false
    })

    const [errors, setErrors] = useState({
        name: "",
        size: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(true)
    
    const [post, setPost] = useState([])

    const schema = yup.object().shape({
        name: yup.string().min(2).required(),
        size: yup.string().oneOf(['small', 'medium', 'large', 'xLarge'], 'please choose your size'),
        special: yup.string(),
        xtraCheese: yup.boolean(),
        pepperoni: yup.boolean(),
        deluxeMeat: yup.boolean(),
        supreme: yup.boolean()
    })

    useEffect(() => {
        schema.isValid(order).then(valid => {
            setButtonDisabled(!valid)
        })
    }, [order])

    useEffect(() => {
        console.log(post)
    }, [post])

    const validateChange = e => {
        yup.reach(schema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
            setErrors({...errors, [e.target.name]: ""})
        })
        .catch(err => {
            setErrors({...errors, [e.target.name]: err.errors[0]})
        })
    }

    const handleChange = e => {
        e.persist()

        validateChange(e);

        setOrder({
            ...order,
            [e.target.name]: e.target.value
        })
    }

    const handleToppings = e => {
        e.persist()

        validateChange(e)

        setOrder({
            ...order,
            [e.target.name]: e.target.checked
        })
    } 

    const submitForm = e => {
        e.preventDefault();

        axios.post('https://reqres.in/api/users', order)
        .then(res => {
            console.log('Order Submitted', res.data)
            setPost([...post, res.data])
            setOrder({
                name: '',
                size: '',
                special: '',
                xtraCheese: false,
                pepperoni: false,
                deluxeMeat: false,
                supreme: false
            })
        })
        .catch(err => {
            console.log('error', err)
        })
    }

    return (
        <>
            <form onSubmit={submitForm}>
                <h2 style={{textAlign: 'center'}}>Lambda Eats Order Form</h2>
                <FlexDiv>
                    <label htmlFor='name'><span>Name: </span>
                        <input type='text' data-cy='name' id='name' name='name' placeholder='Enter Your Name' value={order.name} onChange={handleChange} />
                        <p className='error'>{errors.name.length > 0 ? errors.name : null}</p>
                    </label>
                    <label htmlFor='pizza-size'><span>Size: </span>
                        <select id='pizza-size' name='size' data-cy='size' onChange={handleChange}>
                            <option>--Please Choose A Size--</option>
                            <option value='small'>Small</option>
                            <option value='medium'>Medium</option>
                            <option value='large'>Large</option>
                            <option value='xLarge'>X-Large</option>
                        </select>
                        <p className='error'>{errors.size.length > 0 ? errors.size : null}</p>
                    </label>
                </FlexDiv>
                <h3>Choose Your Toppings!</h3>
                <FlexDiv>
                    <label htmlFor='xtraCheese'>
                        <input type='checkbox' name='xtraCheese' id='xtraCheese' checked={order.xtraCheese} onChange={handleToppings}/><span>Extra Cheese</span>
                    </label>
                    <label htmlFor='pepperoni'>
                        <input data-cy='pepperoni' type='checkbox' name='pepperoni' id='pepperoni' checked={order.pepperoni} onChange={handleToppings}/><span>Pepperoni</span>
                    </label>
                    <label htmlFor='deluxeMeat'>
                        <input type='checkbox' name='deluxeMeat' id='deluxeMeat' checked={order.deluxeMeat} onChange={handleToppings}/><span>Deluxe Meat</span>
                    </label>
                    <label htmlFor='supreme'>
                        <input type='checkbox' name='supreme' id='supreme' checked={order.supreme} onChange={handleToppings} /><span>Supreme</span>
                    </label>
                </FlexDiv>
                <label htmlFor='special' style={{margin: '0 0 0 20px'}}>
                    <textarea data-cy='special' style={{marginTop: '20px', width: '400px', height: '50px'}}id='special' name='special' placeholder='Enter Any Special Instructions' value={order.special} onChange={handleChange} />
                </label><br />
                <button data-cy='submit' type='submit' style={{marginLeft: '20px'}} disabled={buttonDisabled}>Submit Order</button>
            </form>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </>
    )
}

export default OrderForm