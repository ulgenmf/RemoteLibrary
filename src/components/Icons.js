export function Icon({ size, className, src }) {
	return (
		<img
			src={`/../assets/${src}.png`}
			size={`${size}`}
			className={`${className}`}
		/>
	);
}
