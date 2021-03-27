import { MapContainer, TileLayer, Marker, Popup, MapConsumer } from "react-leaflet";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Map = ({ rooms, onClick, addingEvent, onMapClick }) => {

  return (
    <div className="map">
      <MapContainer
        center={[50.049683, 19.944544]}
        zoom={13}
        scrollWheelZoom={true}
		animate={true}
		easeLinearity={0.35}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		  noWrap={true}
        />

		<MapConsumer>
			{(map) => {
				if (addingEvent === 1)
				{
					map.on("click", function (e) {
						const { lat, lng } = e.latlng;
						onMapClick(lat, lng)
					});
				}
				return null;
			}}
		</MapConsumer>

        {rooms.map((task) => (
          <Marker key={task.id} position={[task.position_x, task.position_y]}>
            <Popup>
              <Typography variant="h6">{task.name}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onClick(task.id, task.name)}
              >
                Connect
              </Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
