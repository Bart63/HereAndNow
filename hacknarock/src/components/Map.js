import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Map = ({ rooms, onClick }) => {
	return (
			<div className="map">
			<MapContainer center={[50.049683, 19.944544]} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			
			{rooms.map((room) => (

				<Marker key={room.id} position={[room.position_x, room.position_y]}>
					<Popup>
						<Typography variant="h6">
							{room.name}
						</Typography>
						<Button variant="contained" color="primary" onClick={() => onClick(room.id, room.name)}>Connect</Button>
					</Popup>
				</Marker>

			))}

			</MapContainer>
		</div>
	)
}

export default Map
