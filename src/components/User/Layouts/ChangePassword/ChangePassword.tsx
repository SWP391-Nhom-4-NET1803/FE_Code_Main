import React, { useState } from "react";
import style from "./ChangePassword.module.scss";
import SimpleButton from "../../Components/Buttons/SimpleButton";
import { ChangePasswordProperties } from "../../Interfaces/FormProperty";
import { updateUserPassword } from "../../../../utils/api/UserAccountUtils";

const ChangePassword: React.FC<ChangePasswordProperties> = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRetyped, setNewPasswordRetyped] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleNewPasswordRetypedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPasswordRetyped(event.target.value);
  };

  const clearPlaceholder = (inputType: string) => {
    if (inputType === "newPassword") {
      setNewPassword("");
    } else if (inputType === "newPasswordRetyped") {
      setNewPasswordRetyped("");
    }
  };

  const restorePlaceholder = (inputType: string) => {
    if (inputType === "newPassword" && newPassword === "") {
      setNewPassword("");
    } else if (inputType === "newPasswordRetyped" && newPasswordRetyped === "") {
      setNewPasswordRetyped("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (newPassword !== newPasswordRetyped) {
      setErrorMessage("Mật khẩu mới và nhập lại mật khẩu không khớp.");
      return;
    }

    try {
      await updateUserPassword(newPassword); 
      alert("Thay đổi mật khẩu thành công!");
      setNewPassword(""); // Xóa dữ liệu nhập
      setNewPasswordRetyped(""); // Xóa dữ liệu nhập
    } catch (error) {
      console.error("Lỗi khi thay đổi mật khẩu:", error);
      setErrorMessage("Đã xảy ra lỗi khi thực hiện thay đổi mật khẩu.");
    }
  };

  return (
    <div className={style.ChangePasswordContainer}>
      <div className={style.ChangePasswordForm}>
        <h2 className={style.ChangePasswordHeader}>Thay đổi mật khẩu</h2>
        <form
          id="passwordChange"
          className={style.SimpleForm}
          onSubmit={handleSubmit} // Thêm onSubmit để gọi handleSubmit khi submit form
        >
          <input id="username" type="hidden" name="username" value={localStorage.getItem('id')} />
          <label className={`${style.FormRow} ${style.Column}`}>
            <span className={style.Placeholder}>
              {newPassword === "" ? "Mật khẩu mới" : ""}
            </span>
            <input
              id="newPassword"
              type="password"
              name="new_pass"
              autoComplete="new-password"
              className={style.InputField}
              value={newPassword}
              onFocus={() => clearPlaceholder("newPassword")}
              onBlur={() => restorePlaceholder("newPassword")}
              onChange={handleNewPasswordChange}
            />
          </label>
          <label className={`${style.FormRow} ${style.Column}`}>
            <span className={style.Placeholder}>
              {newPasswordRetyped === "" ? "Nhập lại mật khẩu mới" : ""}
            </span>
            <input
              id="newPasswordRetyped"
              type="password"
              name="retype"
              autoComplete="new-password"
              className={style.InputField}
              value={newPasswordRetyped}
              onFocus={() => clearPlaceholder("newPasswordRetyped")}
              onBlur={() => restorePlaceholder("newPasswordRetyped")}
              onChange={handleNewPasswordRetypedChange}
            />
          </label>
          {errorMessage && <p className={style.ErrorMessage}>{errorMessage}</p>}
          <SimpleButton
            buttonType="submit"
            message="Cập nhật mật khẩu"
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
