"use client";

import { YMaps, Placemark, Map as YMap } from "@pbe/react-yandex-maps";
import React, { useState } from "react";
import { Box } from "@mantine/core";

const Map = ({ data }) => {
	const [mapData, _setMapData] = useState({
		center: [55.751574, 37.573856],
		zoom: 9,
	});
	const [coordinates, _setCoordinates] = useState<[number, number][]>([
		[55.684758, 37.738521],
		[57.684758, 39.738521],
	]);
	console.log(data);
	return (
		<Box style={{ width: "100vw", height: "24rem" }}>
			<YMaps query={{ lang: "ru_RU" }}>
				<Box>
					<YMap width={"100%"} height={"100%"} defaultState={mapData}>
						{coordinates.map((coordinate, index) => (
							<Placemark
								key={`${index}-coordinate`}
								geometry={coordinate}
							/>
						))}
					</YMap>
				</Box>
			</YMaps>
		</Box>
	);
};

export default Map;
