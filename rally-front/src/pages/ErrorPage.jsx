import { Link } from "react-router-dom"


function ErrorPage() {
  return (
    <section className="" id='error-page'>
        <h1 className="">ERROR</h1>
        <h2>Forbidden. ¡No puedes Entrar!</h2>
        <Link to='/'>Inicio</Link>
    </section>
  )
}

export default ErrorPage