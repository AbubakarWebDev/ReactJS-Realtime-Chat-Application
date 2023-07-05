import React from 'react';

import AddGroupMembersMultiSelectInput from "../../AddGroupMembersMultiSelectInput";

import styles from "./style.module.scss";
const { groupProfileForm } = styles;

function GroupChatProfile({ register, control, errors }) {
  return (
    <div className={groupProfileForm}>
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
      />
    </div>
  );
}

export default GroupChatProfile;