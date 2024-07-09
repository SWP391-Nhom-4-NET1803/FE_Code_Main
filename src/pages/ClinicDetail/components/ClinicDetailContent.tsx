import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Avatar, Box, Breadcrumbs, Button, Divider, Link, Typography } from '@mui/material';
import ImageList from './ImageList/ImageList';
import ClinicServices from './ClinicServices/ClinicServices';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ClinicDetailContent.module.css';
import { fetchClinicImages } from '../../../utils/UploadFireBase';
import { ClinicInfoModel } from '../../../utils/interfaces/ClinicRegister/Clinic';
import { getClinicInformation } from '../../../utils/api/MiscUtils';  // Adjust the path as per your file structure
import { ClinicServiceInfoModel } from '../../../utils/api/BookingRegister';
import { getClinicServices } from '../../../utils/api/ClinicOwnerUtils';

const ClinicDetailContent = () => {
    const { id } = useParams<{ id: string }>();
    const [images, setImages] = useState<string[]>([]);
    const [logo, setLogo] = useState<string>('');
    const [services, setServices] = useState<ClinicServiceInfoModel[]>([]);
    const [clinic, setClinic] = useState<ClinicInfoModel>();
    const [loading, setLoading] = useState<boolean>(true);

    const navigator = useNavigate();

    const fetchData = async () => {
        try {
            if (!id) return;
            setLoading(true);
            const response = await fetch(`https://localhost:7163/api/clinic/${id}`);
            if (!response.ok) {
                navigator('/error')
                throw new Error('Failed to fetch clinic information');
            }
            const clinicInfo = await response.json();
            const services = await getClinicServices(Number(id));
            fetchImages('carousel', clinicInfo.content.id);
            fetchImages('logo', clinicInfo.content.id);
            setClinic(clinicInfo.content);
            setServices(services);
        } catch (error) {
            console.error('Error fetching clinic information:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);


    const fetchImages = async (folderName: string, clinicId: number) => {
        const folderPath = `clinics/${clinicId}/${folderName}/`;
        console.log('Fetching images from:', folderPath);
        try {
            const imageUrls = await fetchClinicImages(folderPath);
            if (folderName === 'carousel') {
                setImages(imageUrls);
            } else if (folderName === 'logo') {
                setLogo(imageUrls[0]);
            }
        } catch (error) {
            console.error(`Error fetching images from ${folderName}:`, error);
        }
    };

    const handleBooking = () => {
        if (localStorage.getItem('accessToken')) {
            navigator(`/booking/${id}`, { state: { clinicName: clinic.name } });
        } else {
            navigator('/login')
        }
    }

    function formatTime(time: string): string {
        const [hours, minutes] = time.split(':');

        return `${hours}:${minutes}`;
    }

    if (loading) {
        return (
            <Typography variant="h4" sx={{ paddingTop: '5em', paddingBottom: '5em' }}>
                Loading...
            </Typography>
        );
    }

    return (
        <Box className={styles.container}>
            {clinic && (
                <>
                    <Box className={styles.breadcrumbs}>
                        <Breadcrumbs>
                            <Link underline="hover" color="inherit" href="/" className={styles.breadcrumbLink}>
                                Trang chủ
                            </Link>
                            <div className={styles.breadcrumbText}>Trang phòng khám</div>
                        </Breadcrumbs>
                    </Box>
                    <Divider className={styles.divider} />
                    <Box className={styles.clinicHeader}>
                        <div className={styles.avatar}>
                            <img
                                src={logo}
                                alt={`${clinic.name} Logo`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div className={styles.clinicName}>
                            {clinic.name}
                        </div>
                    </Box>

                    <Divider className={styles.divider} />

                    <Box className={styles.imageList}>
                        <ImageList images={images} />
                    </Box>

                    <Box className={styles.imageList} style={{ textAlign: 'right' }}>
                        <Button variant="contained" onClick={handleBooking} className={styles.button}>
                            Đặt lịch ngay
                        </Button>
                    </Box>

                    <div className={styles.main}>
                        <div className={styles.section}>
                            <h4 className={styles.sectionTitle}>Giới thiệu</h4>
                            <p className={styles.sectionContent}>
                                {clinic.description}
                            </p>
                        </div>
                        <hr className={styles.divider} />

                        <div className={styles.section}>
                            <h4 className={styles.sectionTitle}>Thời gian khám</h4>
                            <p className={styles.sectionContent}>
                                Thứ Hai – Chủ Nhật: {formatTime(clinic.openHour)} - {formatTime(clinic.closeHour)}
                            </p>
                        </div>

                        <div className={styles.section}>
                            <h4 className={styles.sectionTitle}>Địa chỉ</h4>
                            <p className={styles.sectionContent}>
                                {clinic.address}
                            </p>
                        </div>


                        <div className={styles.section}>
                            <h4 className={styles.sectionTitle}>Thông tin liên hệ</h4>
                            <div className={styles.contactInfo}>
                                <p className={styles.contactItem}>
                                    <strong>Email:</strong> <span>{clinic.email}</span>
                                </p>
                                <p className={styles.contactItem}>
                                    <strong>Số điện thoại:</strong> <span>{clinic.phone}</span>
                                </p>
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h4 className={styles.sectionTitle}>Dịch vụ</h4>
                            <ClinicServices services={services} />
                        </div>
                    </div>


                    {/* <Box className={styles.detailSection}>
                        <Box className={styles.sectionContent}>
                            <Typography variant="h4" className={styles.sectionTitle}>
                                Giới thiệu chi tiết
                            </Typography>
                            <Typography variant="body1" className={styles.sectionContent}>
                                {clinic.description}
                            </Typography>
                        </Box>
                        <Box className={styles.sectionContent}>
                            <Typography variant="h6" className={styles.sectionTitle}>
                                Thời gian khám:
                            </Typography>
                            <Typography variant="body1" className={styles.sectionContent}>
                                {clinic.openHour} - {clinic.closeHour}
                            </Typography>
                        </Box>

                        <Box className={styles.sectionContent}>
                            <Typography variant="h6" className={styles.sectionTitle}>
                                Địa chỉ:
                            </Typography>
                            <Typography variant="body1" className={styles.sectionContent}>
                                {clinic.address}
                            </Typography>
                        </Box>

                        <Box className={styles.sectionBottom}>
                            <Typography variant="h6" className={styles.sectionTitle}>
                                Dịch vụ nổi bật:
                            </Typography>
                        </Box>
                    </Box> */}
                </>
            )}
        </Box>
    );
};

export default ClinicDetailContent;
