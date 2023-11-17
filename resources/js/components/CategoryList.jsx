import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from '../Context';
import CategoryCard from './CategoryCard';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Spinner, Container, Row, Button } from 'react-bootstrap';

function CategoryList() {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { token, id_rol } = useContext(MyContext);
  const [categoryData, setCategoryData] = useState([]);

  const updateComponent = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (!token) {
      navigate("/Proyecto_biblioteca/public/login");
      return;
    }
    if (id_rol != 1) {
      navigate("/Proyecto_biblioteca/public/");
    }

    const getCategories = async () => {
      await axios.get("http://localhost/Proyecto_biblioteca/public/api/category_index", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
        .then(function (response) {
          console.log(categoryData);
          setCategoryData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });
    }

    getCategories()
  }, [token, navigate, refresh])

  const handleAddCategoryClick = () => {
    navigate('/Proyecto_biblioteca/public/AddCategory');
  };

  if (!categoryData.length) return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
  return (
    <>
      <Container >
        {id_rol == '1' && (
          <Button variant="primary" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleAddCategoryClick}>
            Add Category
          </Button>
        )}
        <Row>
          {categoryData.map((category) => (
            <CategoryCard key={category.id}
              id={category.id}
              category_name={category.category_name}
              description={category.description}
              updateComponent={updateComponent}
            />
          ))}
        </Row>
      </Container>
    </>

  );

}


export default CategoryList;