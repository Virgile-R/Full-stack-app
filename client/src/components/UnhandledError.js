export default function UnhandledErrors(props) {
    return (
    <main>
            <div className="wrap">
                <h2>Error</h2>
                <p>Sorry! We just encountered an unexpected error. {props.errors}</p>
                <a className="button button-secondary" href='/'>Go back</a>
            </div>
    </main>
    )
}