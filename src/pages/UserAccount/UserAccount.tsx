import React, { useEffect, useState } from 'react';
import moment from 'moment';
import style from './User.module.scss'
import ImagePlaceholder from '../../assets/img_placeholder.jpg';
import Header from '../../components/Header/Header';
//import UserProfileNavigation from '../../components/Layout/List/UserProfileNavigation/UserProfileNavigation';
import Footer from '../../components/Footer/Footer';
//import ChangePasswordForm from '../../components/Layout/Form/ChangePasswordForm';
// import { Payment, UserInfo, default_data } from '../../utils/Objects/UserInformation';
import VerifyState from '../../components/State/VerifyState';
import { useNavigate } from 'react-router-dom';



export interface UserStatus{
    state_number: number,
    message?: string,
  }

export interface Payment {
    creditInfo: string | null,
    creditValue: string | null,
    creditValid: UserStatus | null,
}
  

export interface UserInfo {
    user_id: string | null,
    username: string | null,
    name: string | null,
    phone: string | null,
    gender: string | null,
    birthdate: string | null,
    ethnic: string | null,
    email: string | null,
    ssc: string | null, 
    insurance: string | null,
    profile_image: string | null,
    status: UserStatus | null,
    payment_info: Payment[] | null,
}

export const default_data: UserInfo = 
{
    "user_id": null,
    "username": null,
    "name": null,
    "phone": null,
    "gender": null,
    "birthdate": null,
    "ethnic": null,
    "email": null,
    "ssc": null,
    "insurance": null,
    "profile_image": null,
    "status": null,
    "payment_info": [{creditInfo: null, creditValue: null, creditValid: null}],
}


//# Default data and functions

// Mocking data
const template_data: UserInfo = 
{
    "user_id": "The Null Pointer Exception",
    "username": "Collin Phan",
    "name": "Charles Vander Lin",
    "phone": "0933015921",
    "gender": "Nam",
    "birthdate": "30-4-1945",
    "ethnic": "Kinh",
    "email": "example@gmail.com",
    "ssc": "03968230692155",
    "insurance": null,
    "profile_image": null,
    "status": {state_number: 4, message:"Đã xác minh"},
    "payment_info": [
      {creditInfo: "Momo", creditValue: "90341-*****-*****", creditValid: {state_number: 2, message: "Chưa xác minh"}}, 
      {creditInfo: "VNPay", creditValue: "903-***-***", creditValid: {state_number: 3, message: "Đang xử lí"}},  
      {creditInfo: "Paypal", creditValue: "*****-*****-*****", creditValid: {state_number: 4, message: "Đã xác minh"}}, ],
}


//# The main class definition
const UserAccount: React.FC = () => {

  // Sử dụng useState để lưu thông tin.
  const [userData, setUserData] = useState<UserInfo>(default_data);

  // # Function declaration.

  // Hàm lấy thông tin
  const fetchUserData = () => {
    try {
      //const CookiesArray: string = document.cookie RegExpMatchArray | null = document.cookie;
      // Let's say ... I do some fetching here

      //CookiesArray != null ? CookiesArray.forEach((v: string, i: number) => {console.log(`${i}. ${v}`)}) : null;
      // fetch(`https://localhost:7163/api/user/${property.userdata}`);

      // And return the fetch result.
      setUserData(template_data);
    }
    catch(e: unknown){
      if (typeof e === "string") {
          console.log(e.toUpperCase())
      } else if (e instanceof Error) {
          console.log(e.message)
      }
      setUserData(default_data);
    }
  }

  // Tạo hàng
  const payment_method = userData.payment_info.map((v: Payment, i: number) => {
    return (
      <tr key={i.toString()} className={style.TableRow}>
        <td key={`row_${i}_label`} className={`${style.TableData} ${style.FieldName}`}>{v.creditValue}</td>
        <td key={`row_${i}_value`} className={`${style.TableData} ${style.FieldName}`}>{v.creditInfo ?? "--"}</td>
        <td key={`row_${i}_status`} className={`${style.TableData} ${style.FieldName}`}>{<VerifyState  state_number={v.creditValid?.state_number ?? 0} message={v.creditValid?.message ?? "Không xác định"} /> ?? "--"}</td>
      </tr>
  )});

  // Hàm cập nhật thông tin
  const updateUserData = (event: React.FormEvent<HTMLInputElement>) => {
      setUserData({... userData, [event.currentTarget.name] :event.currentTarget.value});
  }

  const doNavigate = useNavigate()

  // Hàm hiện popup thay đổi ảnh
  const changePicture = () => {
    
  }

  useEffect(() => {
  fetchUserData();
  }, [ ])

  // # Rendering settings
  useEffect(() => {
    console.log("Changed!")
  }, [userData])


  return (
    <>
      <Header />
      <main className={style.FlexContainer}>
        <div className={style.MainSection}>

          <h2 className={style.MediumHeader}>Tài khoản</h2>

          <div className={style.InfoBoard}>

              <div className={style.ProfileInfo}>

                <div className={style.ProfileImagePlaceholder}>
                  <span className={style.ProfileImage}>
                    <img src={userData.profile_image ?? ImagePlaceholder} onClick={changePicture} alt="lmao"/>
                  </span>
                  <span className={style.ProfileGeneralInfo}>
                    <h2>{userData.username ?? "--"}</h2>
                    <p className={style.PatientCode}>Mã bệnh nhân: {userData.user_id ?? "--"}</p>
                    <VerifyState state_number={userData.status?.state_number ?? 0} message={userData.status?.message ?? "Không xác định"}/>
                  </span>
                </div>

                <h3 className={style.SectionHeader}>Thông tin chung</h3>
                
                <table className={style.InformationTable}>
                  <tbody>

                    <tr className={style.TableRow}>
                      <td className={`${style.TableData} ${style.FieldName}`}>Tên đăng nhập</td>
                      <td className={`${style.TableData} ${style.FieldValue}`}>
                        <input type='text' name='username' placeholder='vd: NguyenQuang6202'  onBlur={updateUserData} defaultValue={userData.username == null ? "--" : userData.username}/>
                      </td>
                    </tr>

                    <tr className={style.TableRow}>
                      <td className={`${style.TableData} ${style.FieldName}`}>Số điện thoại</td>
                      <td className={`${style.TableData} ${style.FieldValue}`}>
                        <input  type='text' name='phone' placeholder='vd: 090xxxxxxx' onBlur={updateUserData} defaultValue={userData.phone == null ? "--" : userData.phone}/>
                      </td>
                    </tr>
                    <tr className={style.TableRow}>
                      <td className={`${style.TableData} ${style.FieldName}`}>Email</td>
                      <td className={`${style.TableData} ${style.FieldValue}`}>
                        <input type='text' name="email" placeholder='vd: example@gmail.com' onBlur={updateUserData} defaultValue={userData.email == null ? "--" : userData.email}/>
                      </td>
                    </tr>

                    <tr className={style.TableRow}>
                      <td className={`${style.TableData} ${style.FieldName}`}>Căn cước công dân</td>
                      <td className={`${style.TableData} ${style.FieldValue}`}>
                        <input type='text' name="ssc" placeholder='vd: 1043XXXXXXXX' onBlur={updateUserData} defaultValue={userData.ssc == null ? "--" : userData.ssc}/>
                      </td>
                    </tr>

                    <tr className={style.TableRow}>
                      <td className={`${style.TableData} ${style.FieldName}`}>Họ và tên</td>
                      <td className={`${style.TableData} ${style.FieldValue}`}>
                        <input  type='text' name='name' placeholder='vd: Trần Văn A' onBlur={updateUserData} defaultValue={userData.name == null ? "--" : userData.name}/></td>
                    </tr>

                    <tr className={style.TableRow}>
                      <td className={`${style.TableData} ${style.FieldName}`}>Ngày sinh</td>
                      <td className={`${style.TableData} ${style.FieldValue}`}>
                        <input type='date' name='birthdate' placeholder={Date.now().toString()} onBlur={updateUserData} defaultValue={moment(userData.birthdate, 'DD-MM-yyyy').format("yyyy-MM-DD")}/>
                      </td>
                    </tr>

                    <tr className={style.TableRow}>
                      <td className={`${style.TableData} ${style.FieldName}`}>Giới tính</td>
                      <td className={`${style.TableData} ${style.FieldValue}`}>
                        <label><input type="radio" name='gender' placeholder='Nam' value="Nam" onChange={updateUserData} checked={userData.gender === "Nam"} /> Nam</label>
                        <label><input type="radio" name='gender' placeholder='Nam' value="Nữ" onChange={updateUserData} checked={userData.gender === "Nữ"}/> Nữ</label>
                        <label><input type="radio" name='gender' placeholder='Nam' value="" onChange={updateUserData} checked={userData.gender === ""}/> Khác</label>
                      </td>
                    </tr>

                    <tr className={style.TableRow}>
                      <td className={`${style.TableData} ${style.FieldName}`}>Dân tộc</td>
                      <td className={`${style.TableData} ${style.FieldValue}`}>
                        <input type='text' name='ethnic' placeholder='Dân tộc' onBlur={updateUserData} defaultValue={userData.ethnic == null ? "--" : userData.ethnic} />
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
              <hr className={style.Line} />
              <div className={style.PaymentInfo}>
                <table>
                  <thead>
                    <tr>
                        <td>Số tài khoản</td>
                        <td>Bên cung cấp</td>
                        <td>Tình trạng</td>
                    </tr>
                  </thead>
                  <tbody>
                    {payment_method}
                  </tbody>
                </table>
                
              </div>
              <hr className={style.Line} />
              {/*<ChangePasswordForm callbacks={() => {}} />*/}
              <button style={{backgroundColor: "rgb(0, 255, 255)"}} onClick={() => {console.log(userData)}}>Bấm để kiểm tra (Bật cửa sổ console)</button>
          </div>
          
        </div>
      </main>
      <Footer />
    </>
  )
}

export default UserAccount;