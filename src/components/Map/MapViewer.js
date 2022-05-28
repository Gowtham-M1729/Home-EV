import {
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


  const locationData = [
    {
      id: 1,
      title: 'Amplify Team Dinner',
      longitude: +props.lon,
      latitude: +props.lat,
    }
  ]

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
					style={{ width: '800px', height: '600px' }}
				>
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
    </>
	)
}

export default MapViewer