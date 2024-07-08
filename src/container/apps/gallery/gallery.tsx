
import React, { FC, Fragment } from "react";
import { LightboxGallery1 } from "./gallerydata";

interface GalleryProps {}

const Gallery: FC<GalleryProps> = () => {
	return (
		<Fragment>
			<LightboxGallery1/>

		</Fragment>
	);
};
export default Gallery;