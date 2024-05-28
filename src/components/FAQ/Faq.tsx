import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Flex } from "@chakra-ui/react"


function FAQ() {
    return (
        <div style={{ color: "black", width: "90%", margin: "0 auto" }}>
            <h1 style={{ textAlign: 'center', marginBottom: "40px"}}>Câu hỏi thường gặp</h1>
            <Flex justifyContent="center" alignItems="center" >
                <Accordion allowToggle>
                    <AccordionItem style={{ width: "60vw" }}>
                        <h2>
                            <AccordionButton style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "20px"}}>
                                <Box textAlign="left" w={800} style={{ fontSize: "20px" }}>
                                    Đăng kí khám bệnh qua ứng dụng có tốn phí không?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} style={{ textAlign: "left", width: "50vw", fontSize: "20px" }}>
                            Không, dịch vụ đăng ký khám online hoàn toàn miễn phí. Bạn chỉ cần chọn thời gian và bác sĩ phù hợp để đặt lịch hẹn một cách tiện lợi.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem style={{ width: "60vw" }}>
                        <h2>
                            <AccordionButton style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "20px" }}>
                                <Box textAlign="left" w={800} style={{ fontSize: "20px" }}>
                                    Tôi được lợi ích gì khi sử dụng ứng dụng đăng kí khám bệnh?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} style={{ textAlign: "left", width: "50vw", fontSize: "20px" }}>
                            Sử dụng ứng dụng đăng ký khám bệnh mang lại nhiều lợi ích như: tiết kiệm thời gian, dễ dàng chọn lựa bác sĩ và thời gian khám phù hợp, nhận nhắc nhở lịch hẹn, và truy cập thông tin khám chữa bệnh một cách thuận tiện.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Flex>
        </div >
    )
}

export default FAQ;