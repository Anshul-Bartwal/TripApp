export function Message({ message }) {
    return(
        <div className={`message ${message.sender}`}> {message.message} </div>
    )
}