
import {
	Flex,
	Heading,
	MapView,
	View,
	Text,
	Image,
} from '@aws-amplify/ui-react'
import { useState } from 'react'
import { Marker, Popup } from 'react-map-gl'
import axios from 'axios'

function MarkerWithPopup({ latitude, longitude, title, description, image, lat, lon }) {
	const [showPopup, setShowPopup] = useState(false)

	const handleMarkerClick = async ({ originalEvent }) => {
		originalEvent.stopPropagation()
		setShowPopup(true)
		try {
			const response = await axios.post(
			  "https://homeev.herokuapp.com/dashboard",
			  {
				  long: lon,
				  lat: lat
			  },
			  null
			);
			console.log(response.data);
		  } catch (err) {
			console.error(err);
		  }
	}

	return (
		<>
			<Marker
				latitude={latitude}
				longitude={longitude}
				onClick={handleMarkerClick}
				scale={0.8}
				color={'blue'}
			/>
			{showPopup && (
				<Popup
					latitude={latitude}
					longitude={longitude}
					offset={{ bottom: [0, -40] }}
					onClose={() => setShowPopup(false)}
				>
					<Heading level={5}>{title}</Heading>
					<Text>{description}</Text>
					<Flex justifyContent={'center'}>
						<Image
							objectFit={'contain'}
							width="200px"
							height="200px"
							src={image}
						/>
					</Flex>
				</Popup>
			)}
		</>
	)
}

export default MarkerWithPopup