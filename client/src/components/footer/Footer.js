import React, { Component } from 'react';
import '../../assets/stylesheets/Footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDev: '',
      otherDevs: []
    }
    this.monitorClick();
    this.showContactInfo = this.showContactInfo.bind(this);
    this.monitorClick = this.monitorClick.bind(this);
  }

  showContactInfo(devNum) {
    const allKeys = Object.keys(this.state);
    const currentDev = `dev${devNum}`;
    const foundKey = allKeys.indexOf(currentDev);

    const otherDevs = allKeys.slice(2, foundKey).concat(allKeys.slice(foundKey + 1, allKeys.length));

    this.setState({ currentDev });
    this.setState({ otherDevs });
  }

  monitorClick() {
    window.addEventListener('click', e => {
      if (e.target.parentElement.className !== 'developer-name-wrapper') {
        this.setState({ currentDev: '' });
        this.setState({ otherDevs: [] });
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
              <li><a href="https://rumble-demo.herokuapp.com/">Rumble</a></li>
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

                {this.state.currentDev === 'dev1' ? <div className="developers-dropdown-wrapper">
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

                {this.state.currentDev === 'dev2' ? <div className="developers-dropdown-wrapper">
                  <ul>
                    <li><a href="https://github.com/kewlfeet">Github</a></li>
                    <li><a href="https://www.linkedin.com/in/don-ayesh-sondapperumaarachchi-827894146/">LinkedIn</a></li>
                    <li><a href="https://angel.co/u/don-sondapperumaarachchi">Angel List</a></li>
                    <li><a href="http://donsondapperumaarachchi.com/">Portfolio</a></li>
                    <li><a href="mailto:ayesh98@gmail.com">Email</a></li>
                  </ul>
                </div> : ''}
              </li>

              <li onClick={() => this.showContactInfo(3)}>
                <div className="developer-name-wrapper">
                  <p>Josh Graham</p>
                  <div className="developers-triangle-wrapper"></div>
                </div>

                {this.state.currentDev === 'dev3' ? <div className="developers-dropdown-wrapper">
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

                {this.state.currentDev === 'dev4' ? <div className="developers-dropdown-wrapper">
                  <ul>
                    <li><a href="https://github.com/johnenriquez">Github</a></li>
                    <li><a href="https://www.linkedin.com/in/johnenriquez/">LinkedIn</a></li>
                    <li><a href="https://angel.co/u/john-enriquez">Angel List</a></li>
                    <li><a href="https://johnenriquez.com/">Portfolio</a></li>
                    <li><a href="mailto:john.enriquez@gmail.com">Email</a></li>
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