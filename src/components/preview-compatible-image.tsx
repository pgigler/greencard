import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { getFixed, getImageUrlFromAsset } from "../util/helper";

const PreviewCompatibleImage = ({
	info,
}: {
	info: { name: string; alt: string; fixedImageEdges: any; getAsset: any; previewStyle?: any };
}) => {
	if (!!info.fixedImageEdges) {
		return <Img fixed={getFixed(info.fixedImageEdges, info.name)} alt={info.alt} />;
	}

	if (!!info.getAsset) {
		const safePreviewStyle = info.previewStyle ? info.previewStyle : {};
		return <img src={getImageUrlFromAsset(info.getAsset, info.name)} alt={info.alt} style={safePreviewStyle} />;
	}

	return <div>"no image found"</div>;
};

export default PreviewCompatibleImage;
