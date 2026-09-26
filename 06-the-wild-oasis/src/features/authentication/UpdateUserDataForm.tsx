import React, { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { T } from "../../libs/common.type";
import { useUpdateUser } from "./useUptadeUser";

function UpdateUserDataForm() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { user } = useUser();

  const { email, user_metadata } = user;
  const { fullName: currentFullName } = user_metadata;

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState("");

  function handleSubmit(e: T) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar("");
          e.target.reset();
        },
      },
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar("");
  }

  return (
    <Form type="regular" onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e: T) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
