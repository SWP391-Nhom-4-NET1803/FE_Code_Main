import { ChakraProvider, Step, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, Stepper, defineStyleConfig, extendTheme, useSteps } from '@chakra-ui/react';


const stepperTheme = defineStyleConfig({
    baseStyle: {
        indicator: {
            borderRadius: 10,
            boderWidth: 10,
            bg: 'blue.600'
        },
    },
});

const theme = extendTheme({
    components: {
        Stepper: stepperTheme,
    },
})

const steps = [
    {},
    {},
    {},
    {},
    {}
]


const ProgressBar = ({ activeStep }: { activeStep: number }) => {

    return (
        <ChakraProvider theme={theme}>
            <Stepper size='lg' index={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>
                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
        </ChakraProvider>
    );
}

export default ProgressBar;
