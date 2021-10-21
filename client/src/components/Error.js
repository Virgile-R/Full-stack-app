export default function Error(props) {
    return (
    <main>
            <div className="wrap">
                <h2>Error</h2>
                <p>Sorry! We just encountered an unexpected error. {props.errors}</p>
            </div>
    </main>
    )
}