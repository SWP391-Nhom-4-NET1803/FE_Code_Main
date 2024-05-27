import React from 'react'
import style from './States.module.scss'
import { UserStatus } from '../../utils/Objects/UserInformation';


const predefined = [style.DefaultState, style.InfoState, style.InvalidState, style.WarnState, style.ValidState]

const VerifyState: React.FC<UserStatus> = ( {state_number, message}: UserStatus ) => {

  const choosen: string = predefined[state_number];
  return (
    <p className={choosen}>{message ?? "status"}</p>
  )
}

export default VerifyState