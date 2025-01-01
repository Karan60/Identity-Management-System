import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'inline-block',
    width: '300px',
    height: '300px',
    marginLeft: '35%',
    objectFit: 'cover',
    borderRadius: '5%',
}));

const Image = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '5%',
});

const AddIconWrapper = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '50%',
    padding: '15px', // Adjust the padding to create a proper round circle
    width: '50px', // Set a fixed width and height for a perfectly round shape
    height: '50px', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
        backgroundColor: 'rgba(91, 101, 243, 0.9)', // Change background color on hover
    },
});

const AddImageText = styled(Box)({
    textAlign: 'center',
    marginTop: '13px', // Adjusted to move closer to the plus sign
    fontSize: '24px',
    color: 'rgb(255, 255, 255)', // Corrected the extra semicolon
    position: 'absolute',
    top: 'calc(50% + 30px)', // Position text below the plus sign
    left: '50%',
    transform: 'translateX(-50%)',
    textShadow: '4px 4px 10px rgba(0, 0, 0, 0.9)', // Increased shadow for more prominence
});



const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
};

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const getImage = async () => { 
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                const response = await API.uploadFile(data);
                setPost(prevPost => ({
                    ...prevPost,
                    picture: response.data
                }));
            }
        };

        getImage();
        setPost(prevPost => ({
            ...prevPost,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        }));

    }, [file, account.username, location.search]);  // Added missing dependencies

    const savePost = async () => {
        await API.createPost(post);
        navigate('/');
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <ImageWrapper>
                <Image src={url} alt="post" />
                <AddIconWrapper>
                    <label htmlFor="fileInput">
                        <Add fontSize="large" color="action" />
                    </label>
                </AddIconWrapper>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <AddImageText>Add Your Image</AddImageText>
            </ImageWrapper>

            <StyledFormControl>
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Enter Your Name here" />
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>

            <Textarea
                rowsMin={5}
                placeholder="Add Your Personal Details.."
                name='description'
                onChange={(e) => handleChange(e)} 
            />
        </Container>
    );
};

export default CreatePost;
