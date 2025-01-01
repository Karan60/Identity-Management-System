
import { Box, styled, Typography, Link } from '@mui/material';
import { Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 40vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h4">Getting in touch is easy!</Typography>    
                <Text variant="h5">
                For any queries or further information about the Identity Management System project, please feel free to reach out on: my instagram 
                    <Link href="https://www.instagram.com/Karan_Nath_60/" color="inherit" target="_blank">
                        <Instagram/>
                    </Link>
                     --or send me an Email  --
                    <Link href="mailto:codeforinterview@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop: '20px' }}>
              <Typography variant="h3">
              Thank You For Visiting Our Website!
              </Typography>
                 </Box>

            </Wrapper>
        </Box>
    );
}

export default Contact;