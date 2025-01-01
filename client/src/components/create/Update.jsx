import React, { useState, useEffect } from 'react';
import { Box, styled, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const ImageContainer = styled(Box)`
    position: relative;
    display: inline-block;
    width: 300px;
    height: 300px;
    margin-left: 35%;
    border-radius: 5%;
    overflow: hidden;
`;

const Image = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover'
});

const PlusIconContainer = styled(Box)`
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    cursor: pointer;
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '50%',
    padding: '55px', // Adjust the padding to create a proper round circle
    width: '70px', // Set a fixed width and height for a perfectly round shape
    height: '70px', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    box-shadow: 0 2px 4px rgb(255, 248, 248);
    transition: color 0.3s, transform 0.3s;

    &:hover {
        color: blue;
        transform: translate(-50%, -50%) scale(1.1);
    }
`;

const AddText = styled('span')`
    margin-top: 18px;
    font-size: 24px;
    color: white;
    text-align: center;

    &:hover {
        color: blue;
    }
`;

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

const StyledTextArea = styled(TextareaAutosize)`
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
    username: 'codeforinterview',
    categories: 'Tech',
    createdDate: new Date()
};

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await API.uploadFile(data);
                if (response.isSuccess) {
                    setPost(prevPost => ({
                        ...prevPost,
                        picture: response.data
                    }));
                }
            }
        };
        getImage();
    }, [file]);

    const updateBlogPost = async () => {
        const response = await API.updatePost(post);
        if (response.isSuccess) {
            navigate(`/details/${id}`);
        }
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            {/* Image with Plus Sign Overlay */}
            <ImageContainer>
                <Image src={post.picture || url} alt="post" />
                <label htmlFor="fileInput">
                    <PlusIconContainer>
                        <Add fontSize="large" />
                        <AddText>Update your image</AddText>
                    </PlusIconContainer>
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </ImageContainer>

            {/* Form Controls */}
            <StyledFormControl>
                <InputTextField
                    onChange={(e) => handleChange(e)}
                    value={post.title}
                    name="title"
                    placeholder="Update Your Name..."
                />
                <Button
                    onClick={updateBlogPost}
                    variant="contained"
                    color="primary"
                >
                    Update
                </Button>
            </StyledFormControl>

            {/* Text Area for Description */}
            <StyledTextArea
                rowsMin={5}
                placeholder="Update Your Personal Details.."
                name="description"
                onChange={(e) => handleChange(e)}
                value={post.description}
            />
        </Container>
    );
};

export default Update;
