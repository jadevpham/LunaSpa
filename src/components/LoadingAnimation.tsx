import Lottie from "react-lottie";
import animationData from "../../public/Animation - 1740640302159.json";

const LoadingAnimation = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-90 z-50">
			<div className="flex flex-col items-center">
				<Lottie options={defaultOptions} height={270} width={270} />
			</div>
		</div>
	);
};

export default LoadingAnimation;
