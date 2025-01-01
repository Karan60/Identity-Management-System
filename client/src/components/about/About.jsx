
import { Box, styled, Typography } from '@mui/material';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 35vh;
    background-position: left 0px bottom 0px;
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

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Text variant="h5">The Identity Management System is a web-based platform for students to create and manage profiles, connect with peers, and build networks. Developed using the MERN stack, it offers secure login, profile customization, and a comment section for seamless student interaction, fostering collaboration and simplifying identity management.<br />
                <br></br>The platform ensures data security and seamless interaction through modern web technologies. It is designed to promote networking among students by sharing skills, interests, and academic goals.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;