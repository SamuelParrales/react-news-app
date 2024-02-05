import { useLang } from "../hooks"


export const WithoutResults = () => {
    const Lang = useLang();
  return (
    <section className="without-results">
        <div className="without-results__img">
        <p className="without-results__msg">
        {Lang('No results found')}
        </p>
        </div>
      
    </section>
  )
}
