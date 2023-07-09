import React from 'react';

import ChatListItem from "../../ChatList/ChatListItem";
import AddGroupMembersMultiSelectInput from "../../AddGroupMembersMultiSelectInput";

import { transFormIntoOptions } from '../../../utils';

import styles from "./style.module.scss";
const { groupProfileForm } = styles;

function GroupChatProfile({ register, control, errors, user, chat, isGroupAdmin }) {
  const groupUsers = transFormIntoOptions(
    chat.users,
    (user) => `${user.firstName} ${user.lastName}`,
    "_id",
    { avatar: "avatar", email: "email" }
  );

  const groupAdmins = transFormIntoOptions(
    chat.groupAdmins,
    (user) => `${user.firstName} ${user.lastName}`,
    "_id",
    { avatar: "avatar", email: "email" }
  );

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

      {isGroupAdmin ? (
        <>
          <div className='mb-3'>
            <label htmlFor="users">Update Group Members</label>

            <AddGroupMembersMultiSelectInput
              users={groupUsers}
              control={control}
              errors={errors}
              name="users"
            />
          </div>

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
        </>
      ) : (
        <>
          <div className="mb-3">
            <p>Group Admins: </p>

            {[...groupAdmins].map(user => (
              <ChatListItem
                key={user.value}
                name={user.label}
                lastMsgText={<span><b>Email: </b> {user.email} </span>}
                avatarUrl={`${process.env.REACT_APP_SERVER_BASE_URL}/${user.avatar}`}
              />
            ))}
          </div>

          <div className="mb-3">
            <p>Group Members: </p>

            {[...groupUsers].map(user => (
              <ChatListItem
                key={user.value}
                name={user.label}
                lastMsgText={<span><b>Email: </b> {user.email} </span>}
                avatarUrl={`${process.env.REACT_APP_SERVER_BASE_URL}/${user.avatar}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default GroupChatProfile;