import React, { useState, useEffect } from 'react';
import airplayImg from './assets/airplay.png';
import genericRequest from './ApiRequests';

export default function DeviceList(){
  const [currentDevice, setCurrentDevice] = useState(undefined);
  const [devices, setDevices] = useState(undefined);
  const [showDevices, toggleDevices] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);

  useEffect( () => {
    genericRequest('get', '/me/player/devices', urlParams.get('access_token')).then(response => {
      setDevices(response.data.devices);
      setCurrentDevice(response.data.devices.filter( e => e.is_active)[0]);
    });
  }, []
  );

  return(
    <div className='current-device'>
      {showDevices ? <div className='device-list'> <b>Devices</b>
        {devices ? devices.map( (device, i)  => <div key={i} > {device.is_active ?  <b> {device.name}</b> : device.name } </div>):'No devices to play from'}
      </div> : ''
      }
      <div>
        <b>{ currentDevice ? currentDevice.name : 'No Devices Available' }</b>
        <img onClick={() => toggleDevices(!showDevices)}className='airplay-icon' alt='devices'src={airplayImg}/>
      </div>
    </div>);
}
