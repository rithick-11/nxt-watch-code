const ContactSection = () => (
  <div className="flex flex-col items-start gap-2">
    <p className="font-medium">CONTACT US</p>
    <ul className="flex items-center gap-3">
      <li>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
          className="h-8"
        />
      </li>
      <li>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
          className="h-8"
        />
      </li>
      <li>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
          className="h-8"
        />
      </li>
    </ul>
    <p>Enjoy! Now to see your channels and recommendations!</p>
  </div>
)

export default ContactSection
