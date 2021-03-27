import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Button from '@material-ui/core/Button';

const Map = ({ onClick }) => {
	return (
			<div className="map">
			<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[51.505, -0.09]}>
				<Popup>
					<Button variant="contained" color="primary" onClick={() => onClick(1)}>Connect</Button>
				</Popup>
			</Marker>
			</MapContainer>
		</div>
	)
}

export default Map
