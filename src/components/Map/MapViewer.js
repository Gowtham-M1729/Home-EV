import {
  Button,
	Flex,
	Heading,
	MapView,
	View,
} from '@aws-amplify/ui-react'
import { useState,useEffect,useCallback } from 'react'
import { Marker, Popup } from 'react-map-gl'
import MarkerWithPopup from './MarkerWithPopup'
import axios from 'axios'

function MapViewer(props) {
  console.log(props)
 

  const [points, setPoints] = useState([])
  const email = localStorage.getItem('email');
  

  const queryOnce = useCallback(async ()=>{
    try {
      if(!props.lat || !props.lon ) return
      const response = await axios.post(
        "https://homeev.herokuapp.com/getcoordinates",
        {
          long: props.lon,
          lat: props.lat
        },
        null
      );
      setPoints(response.data)
      console.log(response.data)
      } catch (err) {
      console.error(err);
      }
  },[props.lon,props.lat])

  useEffect(()=>{
    queryOnce()
  },[queryOnce])

  console.log(email)

  const locationData = [
    {
      id: 1,
      title: 'Amplify Team Dinner',
      longitude: +props.lon,
      latitude: +props.lat,
    }
  ]

  const submitHandler = async()=>{
    try {
      
      const response = await axios.post(
        "https://homeev.herokuapp.com/users/otp",
        {
          email: email
        },
        null
      );
      
      console.log(response.data)
      } catch (err) {
      console.error(err);
      }
  }

  const val = {
    longitude: +props.lon,
		latitude: +props.lat,
    mob_no: "current location",
    title: "customer"
  }
  
  

	return (
    <>
		<View>
			<Flex direction={'column'} alignItems={'left'}>
				<Heading level={3}>Map Data</Heading>
				<MapView
          
					initialViewState={{
						longitude: +props.lon,
						latitude: +props.lat,
						zoom: 12,
					}}
					style={{ width: '120vw', height: '80vh' }}
          
				>
          <Marker
				latitude={+props.lat}
				longitude={+props.lon}
				
				scale={0.8}
				color={'green'}
			/>
					{points.map((loc) => (
						<MarkerWithPopup
							
							latitude={loc.latitude}
							longitude={loc.longitude}
							title={loc.name}
							description={loc.mob_no}
							image={loc.image}
              lat={+props.lat}
              lon={+props.lon}
						/>
					))}
				</MapView>
			</Flex>
		</View>
    <Button variant="contained" onClick={submitHandler}>
      Request Authorization
    </Button>
    </>
	)
}

export default MapViewer