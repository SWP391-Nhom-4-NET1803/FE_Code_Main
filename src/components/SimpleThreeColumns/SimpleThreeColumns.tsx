import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Flex justifyContent="center" alignItems="center" pt={20} style={{ width: "100%", margin: "0 auto", }}>
      <Box p={4} color={"black"} w={1000}>
        <Box textAlign="center" style={{marginBottom: "40px"}}><h1>Tiện ích</h1></Box>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} style={{}}>
          <Feature
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={'Tư vấn miễn phí'}
            text={
              'Đặt lịch hẹn ngay hôm nay để nhận tư vấn chăm sóc răng miệng hoàn toàn miễn phí từ các chuyên gia nha khoa của các phòng khám hàng đầu.'
            }
          />
          <Feature
            icon={<Icon as={FcDonate} w={10} h={10} />}
            title={'Bảo mật thông tin'}
            text={
              'Chúng tôi cam kết bảo vệ và giữ kín mọi thông tin cá nhân của khách hàng theo các tiêu chuẩn bảo mật cao nhất.'
            }
          />
          <Feature
            icon={<Icon as={FcInTransit} w={10} h={10} />}
            title={'Tiết kiệm thời gian'}
            text={
              'Đặt lịch hẹn trực tuyến dễ dàng và nhanh chóng, giúp bạn tiết kiệm thời gian và đến thăm khám đúng giờ.'
            }
          />
        </SimpleGrid>
      </Box>
    </Flex>
  );
}