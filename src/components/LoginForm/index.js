import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from "./style.module.scss";

function LoginForm() {
    const inpElem = [
        {
            id: 1,
            name: "email",
            type: 'text',
            placeholder: "Enter email",
        },
        {
            id: 2,
            name: "password",
            type: 'text',
            placeholder: "Enter Password",
        },
    ];

    const schema = yup.object().shape({
        email: yup.string().required('This field is required').email('Please enter a valid email address'),
        password: yup.string().required('This field is required').min(8, 'Password must be at least 8 characters long'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {inpElem.map(elem => (
                <div key={elem.id} className="mb-3">
                    <input
                        type={elem.type}
                        className="form-control"
                        placeholder={elem.placeholder}
                        {...register(elem.name)}
                    />
                    {errors[elem.name] && <b className="text-danger">{errors[elem.name].message}</b>}
                </div>
            ))}

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default LoginForm;
