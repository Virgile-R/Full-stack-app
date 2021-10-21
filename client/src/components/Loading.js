import './componentsCSS/Loading.css'
export default function Loading() {
   return( <main>
        <div className="wrap">
            <h2>Loading...</h2>
            {/* Code from https://loading.io/css/ */}
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    </main>
    )
}