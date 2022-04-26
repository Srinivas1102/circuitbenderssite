import React, {useState, useEffect} from 'react'
import { Alert, Button } from 'react-bootstrap';
import ImageSlider from './ImageSlider';
import { SliderData } from './SliderData';
import { Link } from 'react-router-dom';
import "./Home.css"
import {  useTranslation } from 'react-i18next'

const Home = (props) => {
    const [show, setShow] = useState(false);
    const {t, i18n} = useTranslation();
    {console.log(show)}
    {console.log(props.location.state)}
    if (props.location.state != undefined) {
        return (
            <>
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{t('Oh snap! You forget to Login!')}</Alert.Heading>
            <p>
              {t('Kindly login to continue Shopping')}
            </p>
            <p>
                {t('Click here to')} <Link to="/login"> {t('Login')}</Link>
            </p>
          </Alert>
         
          </>
        );
      }
      else{
          return( <>
          <h3 style={{backgroundColor:"rgb(59, 58, 58)", margin: '0px', color: '#fff', textAlign: 'center'}}>
            {t('Welcome to Circuitbenders')}
         <br/> {t('PCB shell corporation')}
         </h3>
         <h3 style={{backgroundColor:"rgb(59, 58, 58)", margin: '0px', color: '#fff'}}><br /></h3>
        
          <ImageSlider slides={SliderData} />
          </>)
      }
      return <></>
}

export default Home
