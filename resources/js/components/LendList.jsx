import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from '../Context';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Spinner, Container, Row } from 'react-bootstrap';
import LendCard from './LendCard';

function LendList() {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { token, id_rol } = useContext(MyContext);

  const updateComponent = () => {
    setRefresh(!refresh);
  };

  const [lendData, setLendData] = useState([]);
  useEffect(() => {

    if (!token) {
      navigate("/Proyecto_biblioteca/public/login");
      return;
    }
    if (id_rol != 1) {
      navigate("/Proyecto_biblioteca/public/")
    }

    const getLends = async () => {
      await axios.get("http://localhost/Proyecto_biblioteca/public/api/lend_index", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
        .then(function (response) {
          console.log(lendData);
          setLendData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });
    }
    getLends()
  }, [token, navigate, refresh])

  if (!lendData.length) return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
  return (
    <>
      <Container >
        <Row>
          {lendData.map((lend) => (
            <LendCard key={lend.id}
              id={lend.id}
              id_user={lend.id_user}
              lend_date={lend.lend_date}
              expected_return_date={lend.expected_return_date}
              lend_state={lend.lend_state}
              updateComponent={updateComponent}
            />
          ))}
        </Row>
      </Container>
    </>

  );

}


export default LendList;
