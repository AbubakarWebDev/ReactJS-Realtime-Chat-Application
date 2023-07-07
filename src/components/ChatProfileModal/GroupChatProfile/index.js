import React from 'react';

import AddGroupMembersMultiSelectInput from "../../AddGroupMembersMultiSelectInput";

import styles from "./style.module.scss";
const { groupProfileForm } = styles;

function GroupChatProfile({ register, control, errors, users, groupAdmins, user }) {

  const checkGroupAdmins = groupAdmins.some(elem => elem.value === user._id);

  return (
    <div className={groupProfileForm}>
      <div className="mb-3">

        <label htmlFor="groupName">Update Group Name</label>

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

      <div className='mb-3'>
        <label htmlFor="users">Update Group Members</label>

        <AddGroupMembersMultiSelectInput
          control={control}
          errors={errors}
          users={users}
          name="users"
        />
      </div>

      {checkGroupAdmins && (
        <div className='mb-0'>
          <label htmlFor="groupAdmins">Update Group Admin</label>

          <AddGroupMembersMultiSelectInput
            users={groupAdmins}
            control={control}
            customUser={user}
            name="groupAdmins"
            errors={errors}
          />
        </div>
      )}
    </div>
  );
}

export default GroupChatProfile;