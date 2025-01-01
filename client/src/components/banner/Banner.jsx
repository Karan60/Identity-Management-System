
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
    height: 25vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
font-size: 70px;
color: #FFFFFF;
line-height: 1;
text-shadow:0 0 20px #000000, 
            0 0 40px #000000, 
            0 0 80px #000000;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>Make Your Own Profile</Heading>
        </Image>
    )
}

export default Banner;