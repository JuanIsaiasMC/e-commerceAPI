import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useNavigate } from "react-router-dom";


// datos del login creado

// {
//     "status": "success",
//     "data": {
//         "user": {
//             "status": "available",
//             "id": 95,
//             "firstName": "Juan",
//             "lastName": "Meza",
//             "email": "juanM@gmail.com",
//             "phone": "1234567891",
//             "role": "admin"
//         }
//password juanm1234
//     }
// }
const Login = () => {
    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()

    const submit = data => {
        // localStorage.setItem('')
        // localStorage.getItem('')

        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
            .then((res) => {
                localStorage.setItem('token', res.data.data.token)
                navigate('/')
            })
            .catch(error => {
                if (error.response?.status === 404) {
                    alert("credenciales no validas")
                }
                console.log(error)
            })
        reset({
            email: '',
            password: ''
        })
        // alert('hice submit')
        // console.log(data)
    }


    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="email" {...register('email')} />
                <br />
                <input type="password" {...register('password')} />
                <br />
                <button type='submit'>submit</button>
            </form>

        </div>
    );
};

export default Login;