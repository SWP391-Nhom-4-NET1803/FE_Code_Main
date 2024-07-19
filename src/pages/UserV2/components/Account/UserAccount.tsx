import styles from './UserAccount.module.css';
import { IUserAccount, UserInfoModel } from '../../../../utils/interfaces/User/UserDefinition';
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from 'react';
import SimpleButton from '../../../../components/User/Components/Buttons/SimpleButton';
import StatusBadge from '../../../../components/User/StatusBadge/StatusBadge';
import ImagePlaceholder from '../../../../assets/img_placeholder.jpg';
import ChangePassword from '../../../../components/User/Layouts/ChangePassword/ChangePassword';
import { getCustomerInfo, putUserData, updateCustomerInfo } from '../../../../utils/api/UserAccountUtils';
import { ICustomerModel, ICustomerUpdateModel } from '../../../../utils/Interfaces/interfaces';


function convertToUserInfoModel(userData: IUserAccount): UserInfoModel {
    return {
        id: userData.id ?? 0,
        username: userData.username,
        fullname: userData.fullname ?? '',
        phone: userData.phone ?? '',
        email: userData.email ?? '',
        sex: userData.sex ?? '',
        insurance: userData.insurance ?? '',
        birthdate: userData.birthdate ?? '',
    };
}

const UserAccount = () => {
    const [userData, setUserData]: [ICustomerModel, Dispatch<SetStateAction<ICustomerModel>>] = useState<ICustomerModel>({} as ICustomerModel);
    const [disabled, setDisabled]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);

    const saveUserData = async () => {
        const birtdate: Date = new Date(userData.birthdate);
        const dataToSend: ICustomerUpdateModel = 
        {
            fullname: userData.fullname,
            username: userData.username,
            phone: userData.phone,
            insurance: userData.insurance,
            email: userData.email,
            birthdate:  birtdate.toString() === 'Invalid Date' ? null : `${birtdate.getFullYear()}-${(birtdate.getMonth()+1).toString().padStart(2, '0')}-${birtdate.getDate().toString().padStart(2, '0')}` ,
            sex: userData.sex,
        } 

        const result = await updateCustomerInfo(dataToSend);

        if (result)
        {
            alert('Cập nhật thông tin người dùng thành công');
        }
        else {
            alert('cập nhật thất bại');
        }

        setDisabled(true);
    };

    const updateUserData = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.currentTarget;
        if (type === 'radio') {
            setUserData(prevData => ({ ...prevData, [name]: value }));
        } else {
            setUserData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const changePicture = () => {
        // [Vẫn đang tìm hiểu] 
    };

    const fetchUserData = async () => {
        try {
            const usersData = await getCustomerInfo();
            const normalizedData = { ...usersData,
                insurance: usersData.insurance || '',
            };
            setUserData(normalizedData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect( () => { 
        fetchUserData();
    }, [])

    return (
        <div className={styles.mainContentRightContainer}>
            <div className={styles.MainSection}>
                <h2 className={styles.MediumHeader}>Tài khoản</h2>
                <div className={styles.InfoBoard}>
                    <div className={styles.ProfileInfo}>
                        <div className={styles.ProfileImagePlaceholder}>
                            <span className={styles.ProfileImage}>
                                <img src={ImagePlaceholder} onClick={changePicture} alt="Profile" />
                            </span>
                            <span className={styles.ProfileGeneralInfo}>
                                <h2>{userData.username ?? "--"}</h2>
                                <p className={styles.PatientCode}>Mã bệnh nhân: {userData.customerId ?? "--"}</p>
                                <StatusBadge state_number={userData.isActive ? 4 : 2} message={userData.isActive ? "Đang hoạt động" : "Không hoạt động"} />
                            </span>
                        </div>

                        <h3 className={styles.SectionHeader}>Thông tin chung</h3>
                        <table className={styles.InformationTable}>
                            <tbody>
                                <tr className={styles.TableRow}>
                                    <td className={`${styles.TableData} ${styles.FieldName}`}>Số điện thoại</td>
                                    <td className={`${styles.TableData} ${styles.FieldValue}`}>
                                        <input type='text' name='phone' placeholder='vd: 090xxxxxxx' disabled={disabled} onChange={updateUserData} value={userData.phone || ''} />
                                    </td>
                                </tr>
                                <tr className={styles.TableRow}>
                                    <td className={`${styles.TableData} ${styles.FieldName}`}>Email</td>
                                    <td className={`${styles.TableData} ${styles.FieldValue}`}>
                                        <input type='text' name="email" placeholder='vd: example@gmail.com' disabled={disabled} onChange={updateUserData} value={userData.email || ''} />
                                    </td>
                                </tr>

                                <tr className={styles.TableRow}>
                                    <td className={`${styles.TableData} ${styles.FieldName}`}>Mã bảo hiểm y tế</td>
                                    <td className={`${styles.TableData} ${styles.FieldValue}`}>
                                        <input type='text' name='insurance' placeholder='vd: AN10XXXXXXXX' disabled={disabled} onChange={updateUserData} value={userData.insurance || ''} />
                                    </td>
                                </tr>

                                <tr className={styles.TableRow}>
                                    <td className={`${styles.TableData} ${styles.FieldName}`}>Họ và tên</td>
                                    <td className={`${styles.TableData} ${styles.FieldValue}`}>
                                        <input type='text' name='fullname' placeholder='vd: Trần Văn A' disabled={disabled} onChange={updateUserData} value={userData.fullname || ''} />
                                    </td>
                                </tr>

                                <tr className={styles.TableRow}>
                                    <td className={`${styles.TableData} ${styles.FieldName}`}>Ngày sinh</td>
                                    <td className={`${styles.TableData} ${styles.FieldValue}`}>
                                        <input type='date' name='birthdate' placeholder={Date.now().toString()} disabled={disabled} onChange={updateUserData} value={userData.birthdate || ''} />
                                    </td>
                                </tr>

                                <tr className={styles.TableRow}>
                                    <td className={`${styles.TableData} ${styles.FieldName}`}>Giới tính</td>
                                    <td className={`${styles.TableData} ${styles.FieldValue}`}>
                                        <fieldset disabled={disabled}>
                                            <label><input type="radio" name='sex' value="Nam" onChange={updateUserData} checked={userData.sex === "Nam"} /> Nam</label>
                                            <label><input type="radio" name='sex' value="Nữ" onChange={updateUserData} checked={userData.sex === "Nữ"} /> Nữ</label>
                                            <label><input type="radio" name='sex' value="Khác" onChange={updateUserData} checked={userData.sex === "Khác"} /> Khác</label>
                                        </fieldset>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {!disabled && <SimpleButton buttonType='button' message='Hoàn tất' callback={saveUserData} />}
                        {disabled && <SimpleButton buttonType='button' message='Cập nhật thông tin tài khoản' callback={() => { setDisabled(false) }} />}
                    </div>

                    <hr className={styles.Line} />
                    <ChangePassword username={userData.username} callbacks={() => { }} />
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
