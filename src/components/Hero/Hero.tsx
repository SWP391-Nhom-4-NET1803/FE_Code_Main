import { Box, Flex, Text } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

interface HeroProps {
  styles: { [key: string]: string };
}

export default function Hero({ styles }: HeroProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <Box
      h={"80vh"}
      backgroundColor={"#062e74"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex
        className={styles['flexbox-hero']}
      >
        <Box className={styles['hero-image-container-1']}>
          <img className={styles['hero-image']} src="../../../public/hero-image-1.png" />
          <img className={styles['hero-image']} src="../../../public/hero-image-2.png" />
        </Box>
        <Box className={styles['hero-image-container-2']}>
          {/* <img className={styles['hero-circle-1']} src="../../../public/circle.png" /> */}
          <img className={styles['hero-image']} src="../../../public/hero-image-3.png" />
          {/* <img className={styles['hero-circle-2']} src="../../../public/circle.png" /> */}
        </Box>
        <Box className={styles['hero-container']}>
          <Box className={styles['hero-box']}>
            <Text fontSize={40} fontWeight="bold" color="#eeeeee">
              Ứng dụng đặt khám
            </Text>
            <Text fontSize={25} color="#eeeeee">
              Đặt khám với hơn 100 phòng khám trên SmileCare để có số thứ tự và
              khung giờ khám trước.
            </Text>
            <div className={styles['input-wrapper']}>
              <input
                className={styles['input']}
                type="text"
                placeholder="Tìm kiếm phòng khám"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <FaSearch color="black" />
            </div>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
