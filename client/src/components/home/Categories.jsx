import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

import { categories } from '../../constants/data';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    height: 50px;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    font-size: 14px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    font-weight: bold;
    font-size: 16px;
`;

const CategoryCell = styled(TableCell)`
    &.hoverable:hover {
        background-color: orange;
        color: white;
        transition: 0.3s;
    }

    &.selected {
        background-color: orange;
        color: white;
    }

    font-weight: bold;
    font-size: 16px;
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || '';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    const handleCategoryClick = (type) => {
        setSelectedCategory(type);
    };

    return (
        <>
            <Link to={`/create?category=${selectedCategory}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Your Profile</StyledButton>
            </Link>
            
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <CategoryCell
                            className={`hoverable ${!selectedCategory ? 'selected' : ''}`}
                            onClick={() => handleCategoryClick('')}
                        >
                            <StyledLink to="/">All Categories</StyledLink>
                        </CategoryCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <CategoryCell
                                className={`hoverable ${selectedCategory === category.type ? 'selected' : ''}`}
                                onClick={() => handleCategoryClick(category.type)}
                            >
                                <StyledLink to={`/?category=${category.type}`}>
                                    {category.type}
                                </StyledLink>
                            </CategoryCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </>
    );
};

export default Categories;
