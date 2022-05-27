import {
	Flex,
	Heading,
	MapView,
	View,
} from '@aws-amplify/ui-react'
import { useState } from 'react'
import { Marker, Popup } from 'react-map-gl'
import MarkerWithPopup from './MarkerWithPopup'
function MapViewer(props) {
  console.log(props)

  const locationData = [
    {
      id: 1,
      title: 'Amplify Team Dinner',
      description:
        "It's not everyone, but I'm grateful I was able to see folks in real life and bond over food, drinks and laughs!",
      image:
        'https://aws-map-seattle-blog-pics.s3.amazonaws.com/public/IMG_20220330_204113.jpeg',
      longitude: +props.lon,
      latitude: +props.lat,
    }
  ]

	return (
		<View>
			<Flex direction={'column'} alignItems={'left'}>
				<Heading level={3}>Amplify Seattle Visit</Heading>
				<MapView
					initialViewState={{
						longitude: +props.lon,
						latitude: +props.lat,
						zoom: 12,
					}}
					style={{ width: '600px', height: '600px' }}
				>
					{locationData.map((loc) => (
						<MarkerWithPopup
							key={loc.id}
							latitude={loc.latitude}
							longitude={loc.longitude}
							title={loc.title}
							description={loc.description}
							image={loc.image}
						/>
					))}
				</MapView>
			</Flex>
		</View>
	)
}

export default MapViewer