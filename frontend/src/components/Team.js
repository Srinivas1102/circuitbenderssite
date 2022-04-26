import React from "react"
import "./Login.css"
import "../Pages/About.css"
import {  useTranslation } from 'react-i18next'
export const Team = (props) => {
  const {t} = useTranslation();
  return (
    <div>
    <div id='team' className='text-centered'>
      {console.log(props)}
      <div className='container'>
        <div>
          <h2>{t('MeettheTeam')}</h2>
          <p>
           {/* <h1>Avengers Assemble</h1>  */}
          </p>
        </div>
        <div id='row' className="responsive1">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className='col-md-3 col-sm-6 team'>
                  <div className='thumbnail'>
                    {' '}
                    <img src={d.img} alt='...' className='team-img' />
                    <div className='caption'>
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                    </div>
                  </div>
                </div>
              ))
            : 'loading'}
        </div>
      </div>

    </div>
 
    </div>
  )
}
