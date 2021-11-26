import styles from "./MeetupDetails.module.css";

const MeetupDetail = (props) => {
	const { imageUrl, title, address, description } = props;
	return (
		<section className={styles.detail}>
			<img src={imageUrl} alt="first meetup" />
			<h1>{title}</h1>
			<address>{address}</address>
			<p>{description}</p>
		</section>
	);
};

export default MeetupDetail;
