import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import AddGroupMembersMultiSelectInput from "../AddGroupMembersMultiSelectInput";

const schema = yup.object().shape({
    groupName: yup.string().required('Group Name is required')
        .min(4, 'Group Name must be at least 4 characters')
        .max(25, 'Group Name cannot exceed 16 characters')
        .matches(
            /^[a-zA-Z0-9_ ]+$/,
            'Group Name can only contain alphanumeric characters and underscores'
        ),
    users: yup.array().of(yup.object()).min(1, 'Group Must Contains at least one User').required("Users is Required!")
});

function CreateGroupChatModal({ show, setShow, onSubmit }) {
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <Modal show={show}>
            <Modal.Header className="justify-content-center">
                <Modal.Title>Create Group Chat</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="mb-3">
                    <input
                        type="text"
                        id="groupName"
                        className="form-control"
                        placeholder="Enter Group Name"
                        {...register("groupName")}
                    />

                    {errors.groupName && (
                        <b className="text-danger d-block mt-1">{errors.groupName.message}</b>
                    )}
                </div>

                <AddGroupMembersMultiSelectInput
                    control={control}
                    errors={errors}
                    name="users"
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                <Button variant="primary" onClick={handleSubmit(onSubmit)}>Create Group Chat</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateGroupChatModal;