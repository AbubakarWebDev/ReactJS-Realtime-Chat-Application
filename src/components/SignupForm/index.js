import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function SignupForm() {
    const inpElem = [
        {
            id: 1,
            name: "firstName",
            type: 'text',
            placeholder: "Enter first name",
        },
        {
            id: 2,
            name: "lastName",
            type: 'text',
            placeholder: "Enter last name",
        },
        {
            id: 3,
            name: "email",
            type: 'email',
            placeholder: "Enter email",
        },
        {
            id: 4,
            name: "password",
            type: 'password',
            placeholder: "Enter password",
        },
        {
            id: 5,
            name: "confirmPassword",
            type: 'password',
            placeholder: "Confirm password",
        },
        {
            id: 6,
            name: "avatar",
            type: "file",
            placeholder: "Select a Profile Picture",
        }
    ];

    const schema = yup.object().shape({
        firstName: yup.string().required('This field is required'),
        lastName: yup.string().required('This field is required'),
        email: yup.string().required('This field is required').email('Please enter a valid email address'),
        password: yup.string().required('This field is required').min(8, 'Password must be at least 8 characters long'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
        avatar: yup
            .mixed()
            .test("required", "You need to provide a file", (value) => {
                return value.length > 0 && value[0].size;
            })
            .test("fileType", "Only image files are allowed", (value) => {
                return value.length && ["image/jpeg", "image/png", "image/gif"].includes(value[0].type);
            })
            .test("fileSize", "The file is too large", (value) => {
                return value.length && value[0].size <= 1048576;
            })
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

export default SignupForm;