import React, { useEffect, useState } from 'react'
import { AppointmentViewModelFetch } from '../../../../../utils/api/ClinicOwnerUtils'
import styles from './AppointmentDetail.module.css'
import { createPayment, PaymentModel } from '../../../../../utils/api/BookingRegister';
import { cancelAppointment } from '../../../../../utils/api/MiscUtils';
import { getCustomerAppointments } from '../../../../../utils/api/UserAccountUtils';

interface AppointmentDetailProps {
    appointmentId: string;
    appointments: AppointmentViewModelFetch[];
    setActiveIndex: (index: number) => void;
    source: number
}

const AppointmentDetail: React.FC<AppointmentDetailProps> = ({ appointmentId, appointments, setActiveIndex, source }) => {
    // const appointment = appointments.find(app => app.bookId === appointmentId);
    const [appointment, setAppointment] = useState<AppointmentViewModelFetch>();
    const id = localStorage.getItem('customerId');

    const getStatusText = (status: string) => {
        switch (status) {
            case 'booked':
                return 'Đã đặt lịch';
            case 'pending':
                return 'Đang chờ xác nhận';
            case 'finished':
                return 'Đã hoàn thành';
            case 'canceled':
                return 'Đã hủy';
            default:
                return status;
        }
    }

    const handleBackButtonClick = () => {
        if (source === 1) {
            setActiveIndex(2);
        } else if (source === 0) {
            setActiveIndex(1);
        }
    }


    useEffect(() => {
        setAppointment(appointments.find(app => app.bookId === appointmentId));
    }, [appointments, appointmentId]);

    const fetchData = async () => {
        try {
            const response = await getCustomerAppointments(id);
            if (response) {
                const appointment = response.find(app => app.bookId === appointmentId);
                if (appointment) {
                    setAppointment(appointment);
                    console.log('Appointment fetched:', appointment);
                } else {
                    console.log('Appointment not found');
                }
            } else {
                console.log('No content found in response');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleCancel = async () => {
        try {
            await cancelAppointment(appointmentId);
            await fetchData();
        } catch (error) {
            console.error('Failed to cancel appointment:', error);
        }
    };

    const getAppointmentTypeText = (type: string) => {
        switch (type) {
            case 'treatment':
                return 'Khám chữa trị';
            case 'checkup':
                return 'Khám'
        }
    }

    const formatTime = (timeString: string) => {
        return timeString.slice(0, 5);
    }

    const handlePayment = async () => {
        const paymentPayload: PaymentModel = {
            appointmentId: appointment.bookId,
            orderInfo: `Thanh toán lịch hẹn ${appointment.bookId}`,
            returnUrl: 'http://localhost:5173/success'
        }
        try {
            const response = await createPayment(paymentPayload);
            if (response) {
                window.location.href = response.content
                console.log('Payment success');
            } else {
                console.error('Payment failed:', response);
            }
        } catch (error) {
            console.log(error);
        }
    }


    if (!appointment) {
        return <div>Không tìm thấy lịch hẹn</div>
    }

    return (
        <div className={styles.mainContentRightContainer}>
            <h2 className={styles.mainContentMiddleTitleHeading}>Chi tiết lịch hẹn</h2>
            <div className={styles.mainContentContainerBox}>
                <div className={styles.appointmentDetails}>
                    <p></p>
                    <p><strong>Loại:</strong> {getAppointmentTypeText(appointment.appointmentType)}</p>
                    <p><strong>Ngày khám:</strong> {appointment.appointmentDate}</p>
                    <p><strong>Thời gian:</strong> {formatTime(appointment.appointmentTime)} - {formatTime(appointment.expectedEndTime)}</p>
                    <p><strong>Nha sĩ:</strong> {appointment.dentistFullname}</p>
                    <p><strong>Dịch vụ:</strong> {appointment.selectedServiceName}</p>
                    <p><strong>Phòng khám:</strong> {appointment.clinicName}</p>
                    <p><strong>Địa chỉ:</strong> {appointment.clinicAddress}</p>
                    <p><strong>Trạng thái:</strong> {getStatusText(appointment.bookingStatus)}</p>
                    <p><strong>Ghi chú:</strong> {appointment.dentistNote}</p>
                    <p><strong>Phí:</strong> {appointment.finalFee.toLocaleString()} VND</p>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.goBackButton} onClick={() => handleBackButtonClick()}>Trở về</button>
                {(appointment.bookingStatus !== 'finished' && appointment.bookingStatus !== 'canceled') && (
                    <button className={styles.cancelButton} onClick={handleCancel}>Hủy lịch</button>
                )}
                {appointment.bookingStatus === 'pending' && (
                    <button className={styles.paymentButton} onClick={handlePayment}>Thanh toán</button>
                )}
            </div>
        </div>
    )
}

export default AppointmentDetail;