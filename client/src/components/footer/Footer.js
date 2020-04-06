import React, { Component } from 'react';
import '../../assets/stylesheets/Footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dev1: false,
      dev2: false,
      dev3: false,
      dev4: false
      // currentDev: '',
      // otherDevs: []
    }
    this.monitorClick();
    this.toggleDev = this.toggleDev.bind(this);
    this.monitorClick = this.monitorClick.bind(this);
  }

  toggleDev(e, devNum) {
    const allDevs = Object.keys(this.state);
    const devIndx = devNum - 1;
    let devBool;

    const otherDevs = allDevs.slice(2, devIndx).concat(allDevs.slice(devIndx + 1, allDevs.length));

    if (devNum === 1) {
      devBool = this.state.dev1;
    } else if (devNum === 2) {
      devBool = this.state.dev2;
    } else if (devNum === 3) {
      devBool = this.state.dev3;
    } else {
      devBool = this.state.dev4;
    }

    // Setting the state for the current viewable dev and remaining devs
    this.setState({ [allDevs[devIndx]]: !devBool });
    otherDevs.forEach(dev => { this.setState({ [dev]: false }) });
  }

  monitorClick() {
    const allDevs = Object.keys(this.state);

    window.addEventListener('click', e => {
      if (e.target.parentElement.className !== 'developer-name-wrapper') {
        allDevs.forEach(dev => { this.setState({ [dev]: false }) });
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
              <li>
                <div className="developer-name-wrapper" onClick={e => this.toggleDev(e, 1)}>
                  <p>Karen Lee</p>
                  <div className="developers-triangle-wrapper"></div>
                </div>

                {this.state.dev1 ? <div className="developers-dropdown-wrapper">
                  <ul>
                    <li><a href="https://github.com/karleee">Github</a></li>
                    <li><a href="https://www.linkedin.com/in/karleee/">LinkedIn</a></li>
                    <li><a href="https://angel.co/u/karleee">Angel List</a></li>
                    <li><a href="http://karleee.com/">Portfolio</a></li>
                    <li><a href="mailto:karleee@protonmail.com">Email</a></li>
                  </ul>
                </div> : ''}
              </li>

              <li>
                <div className="developer-name-wrapper" onClick={e => this.toggleDev(e, 2)}>
                  <p>Don Sondapperumaarachchi</p>
                  <div className="developers-triangle-wrapper"></div> 
                </div>

                {this.state.dev2 ? <div className="developers-dropdown-wrapper">
                  <ul>
                    <li><a href="https://github.com/kewlfeet">Github</a></li>
                    <li><a href="https://www.linkedin.com/in/don-ayesh-sondapperumaarachchi-827894146/">LinkedIn</a></li>
                    <li><a href="https://angel.co/u/don-sondapperumaarachchi">Angel List</a></li>
                    <li><a href="http://donsondapperumaarachchi.com/">Portfolio</a></li>
                    <li><a href="mailto:ayesh98@gmail.com">Email</a></li>
                  </ul>
                </div> : ''}
              </li>

              <li>
                <div className="developer-name-wrapper" onClick={e => this.toggleDev(e, 3)}>
                  <p>Josh Graham</p>
                  <div className="developers-triangle-wrapper"></div>
                </div>

                {this.state.dev3 ? <div className="developers-dropdown-wrapper">
                  <ul>
                    <li><a href="https://github.com/JoshGraham1">Github</a></li>
                    <li><a href="https://www.linkedin.com/in/joshua-graham-b8962515a/">LinkedIn</a></li>
                    <li><a href="https://angel.co/u/joshua-graham-10">Angel List</a></li>
                    <li><a href="">Portfolio</a></li>
                    <li><a href="">Email</a></li>
                  </ul>
                </div> : ''}
              </li>

              <li>
                <div className="developer-name-wrapper" onClick={e => this.toggleDev(e, 4)}>
                  <p >John Enriquez</p>
                  <div className="developers-triangle-wrapper"></div>
                </div>

                {this.state.dev4 ? <div className="developers-dropdown-wrapper">
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