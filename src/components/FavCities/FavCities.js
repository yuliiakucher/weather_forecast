// import React, {useEffect, useState} from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import FavCity from "./FavCity/FavCity";
// import {connect} from "react-redux";
// import {changeStorage, getFavPlace} from "../../redux/fav-reducer";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
//
// const FavCities = ({favs, getFavPlace, changeStorage, favsStorage}) => {
//
//     const [show, handleShow] = useState(false)
//     const [input, handleInput] = useState('')
//
//     useEffect(() => {
//         if (localStorage.getItem('fav_location')) {
//             const locations = localStorage.getItem('fav_location').split(' ')
//             locations.map(location => getFavPlace(location))
//         }
//     }, [])
//
//
//     const handleSubmit = (data) => {
//         getFavPlace(data)
//         if (localStorage.getItem('fav_location')) {
//             const local = localStorage.getItem('fav_location').split(' ')
//             local.push(data)
//             localStorage.setItem('fav_location', local.join(' '))
//             changeStorage(localStorage.getItem('fav_location'))
//         }
//         else {
//             localStorage.setItem('fav_location', data)
//             changeStorage(localStorage.getItem('fav_location'))
//         }
//         console.log(data)
//     }
//
//     return (
//         <>
//             <h3>Your Locations</h3>
//             <Container className='m-4'>
//                 <Row>
//                     <Col lg={5}>
//                         <Button variant={'info'} onClick={() => handleShow(!show)}>Add city</Button>
//                     </Col>
//                     <Col lg={4}>
//                         {show &&
//                         <Form.Control
//                             onChange={e => handleInput(e.target.value)}
//                             value={input}
//                         />
//                         }
//                     </Col>
//                     <Col>
//                         {show &&
//                         <Button variant={'info'} onClick={() => handleSubmit(input)}>+</Button>
//                         }
//                     </Col>
//                 </Row>
//             </Container>
//
//
//             {favs.map(fav => (
//                     <FavCity
//                         name={fav.name}
//                         country={fav.country}
//                         temp={fav.temp}
//                         icon={fav.icon}
//                         humidity={fav.humidity}
//                         wind_dir={fav.wind_dir}
//                         wind_speed={fav.wind_speed}
//                         favsStorage={favsStorage}
//                         changeStorage={changeStorage}
//                     />
//                 )
//             )}
//         </>
//     )
// }
//
// let mapStateToProps = (state) => {
//     return {
//         favs: state.FavReducer.favs,
//         favsStorage: state.FavReducer.favsStorage
//     }
// }
//
// export default connect(mapStateToProps, {getFavPlace, changeStorage})(FavCities)
