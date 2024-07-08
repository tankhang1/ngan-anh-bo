import React, { FC, Fragment } from 'react';
import Leafletmapsdata from './leafletmapdata';

interface LeafletmapsProps {}

const Leafletmaps: FC<LeafletmapsProps> = () => {

	return (
		<Fragment>
			<Leafletmapsdata/>
		</Fragment>
	);
};

export default Leafletmaps;
