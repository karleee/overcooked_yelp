import React, { Component } from 'react';
import '../../assets/stylesheets/Footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dev1ShowContact: false,
      dev2ShowContact: false,
      dev3ShowContact: false,
      dev4ShowContact: false
    }
    this.monitorClick();
    this.showContactInfo = this.showContactInfo.bind(this);
    this.monitorClick = this.monitorClick.bind(this);
  }

  showContactInfo(devNum) {
    if (devNum === 1) {
      this.setState({ dev1ShowContact: !this.state.dev1ShowContact });
      this.setState({ dev2ShowContact: false });
      this.setState({ dev3ShowContact: false });
      this.setState({ dev4ShowContact: false });
    } else if (devNum === 2) {
      this.setState({ dev2ShowContact: !this.state.dev2ShowContact });
      this.setState({ dev1ShowContact: false });
      this.setState({ dev3ShowContact: false });
      this.setState({ dev4ShowContact: false });
    } else if (devNum === 3) {
      this.setState({ dev3ShowContact: !this.state.dev3ShowContact });
      this.setState({ dev1ShowContact: false });
      this.setState({ dev2ShowContact: false });
      this.setState({ dev4ShowContact: false });
    } else {
      this.setState({ dev4ShowContact: !this.state.dev4ShowContact });
      this.setState({ dev1ShowContact: false });
      this.setState({ dev2ShowContact: false });
      this.setState({ dev3ShowContact: false });
    }
  }

  monitorClick() {
    window.addEventListener('click', e => {
      if (e.target.parentElement.className !== 'developer-name-wrapper') {
        this.setState({ dev1ShowContact: false });
        this.setState({ dev2ShowContact: false });
        this.setState({ dev3ShowContact: false });
        this.setState({ dev4ShowContact: false });
      }
    });
  }

  render() {
    return (
      <div className="footer-container">
        <div className="footer-columns-wrapper">
          <div className="about-wrapper">
            <h3>About</h3>
            <ul>
              <li><a href="https://github.com/karleee/morsel">Github</a></li>
            </ul>
          </div>

          <div className="discover-wrapper">
            <h3>Discover</h3>
            <ul>
              <li><a href="https://nookbnb.herokuapp.com/#/">Nookbnb</a></li>
              <li><a href="http://sleepify-dev.herokuapp.com/">Sleepify</a></li>
            </ul>
          </div>

          <div className="developers-wrapper">
            <h3>Developers</h3>
            <ul>
              <li onClick={() => this.showContactInfo(1)}>
                <div className="developer-name-wrapper">
                  <p>Karen Lee</p>
                  <div className="developers-triangle-wrapper"></div>
                </div>

                {this.state.dev1ShowContact ? <div className="developers-dropdown-wrapper">
                  <ul>
                    <li><a href="https://github.com/karleee">Github</a></li>
                    <li><a href="https://www.linkedin.com/in/karleee/">LinkedIn</a></li>
                    <li><a href="https://angel.co/u/karleee">Angel List</a></li>
                    <li><a href="http://karleee.com/">Portfolio</a></li>
                    <li><a href="mailto:karleee@protonmail.com">Email</a></li>
                  </ul>
                </div> : ''}
              </li>

              <li onClick={() => this.showContactInfo(2)}>
                <div className="developer-name-wrapper">
                  <p>Don Sondapperumaarachchi</p>
                  <div className="developers-triangle-wrapper"></div> 
                </div>

                {this.state.dev2ShowContact ? <div className="developers-dropdown-wrapper">
                  <ul>
                    <li><a href="https://github.com/kewlfeet">Github</a></li>
                    <li><a href="https://www.linkedin.com/in/don-ayesh-sondapperumaarachchi-827894146/">LinkedIn</a></li>
                    <li><a href="https://angel.co/u/don-sondapperumaarachchi">Angel List</a></li>
                    <li><a href="">Portfolio</a></li>
                    <li><a href="mailto:someone@yoursite.com">Email</a></li>
                  </ul>
                </div> : ''}
              </li>

              <li onClick={() => this.showContactInfo(3)}>
                <div className="developer-name-wrapper">
                  <p>Josh Graham</p>
                  <div className="developers-triangle-wrapper"></div>
                </div>

                {this.state.dev3ShowContact ? <div className="developers-dropdown-wrapper">
                  <ul>
                    <li>Github</li>
                    <li>LinkedIn</li>
                    <li>Angel List</li>
                    <li>Portfolio</li>
                    <li>Email</li>
                  </ul>
                </div> : ''}
              </li>

              <li onClick={() => this.showContactInfo(4)}>
                <div className="developer-name-wrapper">
                  <p >John Enriquez</p>
                  <div className="developers-triangle-wrapper"></div>
                </div>

                {this.state.dev4ShowContact ? <div className="developers-dropdown-wrapper">
                  <ul>
                    <li>Github</li>
                    <li>LinkedIn</li>
                    <li>Angel List</li>
                    <li>Portfolio</li>
                    <li>Email</li>
                  </ul>
                </div> : ''}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-image-wrapper">
          <img src="/images/footer/footer.png" alt="Footer banner" />
        </div>

        <div className="footer-copyright-wrapper">
          <small>Copyright &copy; 2020 Morsel</small>
        </div>
      </div>
    );
  }
}

export default Footer;