import styles from './ClinicRegister.module.css';
import UseMultipleStepForm from '../../components/UseMultipleStepForm/UseMultipleStepForm';
import FormGenerator from '../../components/FormGenerator/FormGenerator';
import ServicesForm from './Forms/ServicesForm';
import CertificationForm from './Forms/CertificationForm';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ClinicRegisterForm = () => {
    const generalContent = [
        { id: 'clinic-name', type: 'text', label: 'Tên phòng khám', placeholder: 'Tên phòng khám' },
        { id: 'clinic-address', type: 'text', label: 'Địa chỉ', placeholder: 'Địa chỉ' },
        { id: 'phone-number', type: 'text', label: 'Số điện thoại', placeholder: 'Số điện thoại' },
        { id: 'email', type: 'email', label: 'Email', placeholder: 'Email' }
    ];

    const { steps, currentStep, step, isFirstStep, isFinalStep, next, back } = UseMultipleStepForm([<FormGenerator inputs={generalContent} />, <ServicesForm />, <CertificationForm />]);

    return (
        <div className={styles.body}>
            <Header />
            <div className={styles["form-header"]}>Đăng kí phòng khám</div>
            <form className={styles["form-container"]}>
                <div className={styles.container}>
                    <div className={styles.step}>{currentStep + 1} / {steps.length}</div>
                    <div>
                        <div>
                            {step}
                        </div>
                        {currentStep === 0 && <div className={styles['hour-input']}>
                            <div className={`col ${styles.hour}`}>
                                <label htmlFor='open-hour' className="form-label">Giờ mở cửa</label>
                                <input id="open-hour" className="form-control" placeholder='7:00'></input>
                            </div>
                            <div className={`col ${styles.hour}`}>
                                <label htmlFor='close-hour' className="form-label">Giờ đóng cửa</label>
                                <input id="close-hour" className="form-control" placeholder='17:00'></input>
                            </div>
                        </div>}

                    </div>
                    <div className={styles['button-container']} style={{ display: "flex", gap: ".5rem", justifyContent: "flex-end", marginTop: "1rem" }}>
                        {!isFirstStep && <button type="button" className="btn btn-secondary" onClick={back}>Back</button>}
                        {!isFinalStep && <button type="button" className="btn btn-primary" onClick={next}>Next</button>}
                        {isFinalStep && <button type="submit" className="btn btn-primary">Submit</button>}
                    </div>
                </div>
            </form >
            <Footer />
        </div >
    )
}


export default ClinicRegisterForm;