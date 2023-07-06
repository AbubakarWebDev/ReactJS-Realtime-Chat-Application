import React from 'react';

import AddGroupMembersMultiSelectInput from "../../AddGroupMembersMultiSelectInput";

import styles from "./style.module.scss";
const { groupProfileForm } = styles;

function GroupChatProfile({ register, control, errors, users }) {
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

      <div className='mb-0'>
        <label htmlFor="users">Update Group Members</label>

        <AddGroupMembersMultiSelectInput
          control={control}
          errors={errors}
          users={users}
        />
      </div>
    </div>
  );
}

export default GroupChatProfile;