/* 
  This is event description text field to collect 
  event description used to generate event listings
*/
const styles = {
  container: {
    padding: "10px",
  },
  inputText: {
    width: "620px",
    height: "150px",
    padding: "20px",
    border: "2px solid #000000",
    // boxShadow: "8px 8px 0px #8336EE",
    borderRadius: "20px",
    outlineColor: "none",
    color: "black",
    fontSize: '17px',
  },
};

export default function EventDescriptionInputField(props) {

  return (
		<div style={styles.container}>
      <form>
				<textarea
					type="text"
					value={props.eventDescriptionInput}
					placeholder="Type your event here..."
					onChange={(e) => props.setEventDescriptionInput(e.target.value)}
					style={styles.inputText}
        />
			</form>
		</div>
	);
}
