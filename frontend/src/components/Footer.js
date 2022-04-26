
import React from 'react'
import { Navbar, NavDropdown, Container } from 'react-bootstrap'
import {  useTranslation } from 'react-i18next'
import "./Footer.css"
const Footer = (props) => {
    const {t, i18n} = useTranslation();
    return (
        <div>
            <div className="sticky-bottom">  
                <Navbar  >
                    <Container>
                    <div className='footer_main'>
                        <div className="footer_up" >
                            <div className="footer_address">
                                <h4 style={{textDecoration: 'underline'}}>{t('Contact Address')}</h4>
                                <p><span><i className='fa fa-map-marker'></i> {t('Address')}</span>
                                {props.data ? props.data.address : 'loading'}
                                </p>
                                <p>
                                <span>
                                <i className='fa fa-phone'></i> {t('Phone')}
                                </span>{' '}
                                {props.data ? props.data.phone : 'loading'}
                                </p>
                                <p>
                                <span>
                                <i className='fa fa-envelope-o'></i> {t('Email')}
                                </span>{' '}
                                {props.data ? props.data.email : 'loading'}
                                 </p>
                                {/* <iframe title="google map" aria-hidden="true" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7775.558354022977!2d80.209887!3d12.985971!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1f246cb3fc1a16a7!2sCircuit%20Benders!5e0!3m2!1sen!2sus!4v1629718497105!5m2!1sen!2sus"></iframe>
                                 */}
                                </div>
                                
                                <div  className="footer_privacy">
                                    <h4 style={{textDecoration: 'underline'}}>{t('Privacy Policy')} </h4>
                                    <li>
                                    {t('Term & Conditions')}
                                    </li>
                                    <li>
                                    {t('Shipping Policy')}
                                    </li>
                                    <li>
                                    {t('Return Policy')}
                                    </li>
                                    <li>
                                    {t('FAQs')}
                                    </li>
                                    </div>
                                <div className="footer_support">
                                    <h4 style={{textDecoration: 'underline'}}>{t('Support')}</h4>
                                    <li>
                                    {t('Sell on Circuitbenders')}
                                    </li>
                                    <li>
                                    {t('Advertise on Circuitbenders')}
                                    </li>
                                    <li>
                                    {t('Affiliate Program')}
                                    </li>
                                    <li>
                                    {t('Partnership')}
                                    </li>
                                    </div>
                                </div>
                                <div className='social'>
                                <ul>
                                <li>
                                    <a href={props.data ? props.data.facebook : '/'}>
                                    <i className='fa fa-facebook'></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={props.data ? props.data.twitter : '/'}>
                                    <i className='fa fa-twitter'></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={props.data ? props.data.youtube : '/'}>
                                    <i className='fa fa-youtube'></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={props.data ? props.data.instagram : '/'}>
                                    <i className='fa fa-instagram'></i>
                                    </a>
                                </li>
                                </ul>
                            </div>
                          
                        </div>
                    </Container>
                    
                </Navbar>
                <div className="copyright">
                <p>{t('© 2021 Circuitbenders.in - All Rights Reserved')}</p>
                <p>{t("We're using Safe Payment through")} <img src="/paytm.png" style={{'filter':'none'}}/></p>
                </div>
                
            </div>
        </div>


      
    )
}

export default Footer
