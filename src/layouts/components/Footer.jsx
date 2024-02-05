import { Icon } from "@iconify/react"
import { memo } from "react"

export const Footer = memo(function Footer(){
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__line">

        </div>
        <div className="footer__links">
          <a className="footer__link" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/samuel-parrales"><Icon icon="akar-icons:linkedin-box-fill" /></a> 
          <a className="footer__link" target="_blank" rel="noreferrer" href="https://github.com/SamuelParrales" ><Icon icon="mdi:github" /></a>
        </div>
        <div className="footer__line">

        </div>
      </div>
      <div className="footer__content">
        <h3>Rect News App</h3>
        <p className="footer__copyright">Copyright © Samuel Parrales</p>
      </div>

    </footer>
  )
})
