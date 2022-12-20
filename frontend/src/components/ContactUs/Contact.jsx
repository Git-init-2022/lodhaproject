import React from 'react'
import './Contact.css'


function Contact() {
  return (
    <>
        <div id="Container" className="mt-5">
            <div id="Card" className="col-12 col-md-10">
                <div id="Form">
                    <div id="Left-side">
                        <span id="Line1"></span>
                        <span id="Line2"></span>
                        <span id="Line3"></span>
                        <div id="Contact-us">
                            <p>Contact Us</p>
                            <span></span>
                        </div>
                        <div id="Social">
                                <i className="fa fa-facebook-f"></i>
                                <i className="fa fa-twitter"></i>
                                <i className="fa fa-instagram"></i>
                                <i className="fa fa-dribbble"></i>
                        </div>
                    </div>
                    <div id="Right-side">
                        <div id="Top-div">
                            <h2>Get in touch !</h2>
                            <p>Contact us for a quote,help or to join the team. </p>
                        </div>
                        <div id="Stats">
                            <div id="Stats1">
                                <i className="fa fa-map-marker"></i>
                                <span>102 Street<br/>2714 DONNZY</span>
                            </div>
                            <div id="Stats2">
                                <i className="fa fa-phone"></i>
                                <span>+02 1203 153</span>
                            </div>
                            <div id="Stats3">
                                <i className="fa fa-envelope"></i>
                                <span>contact@us.fr</span>
                            </div>
                        </div>
                        <div id="Card-content">
                            <span>
                                <div id="Input-text">
                                    <input type="text" className="textInputContact" required="required"/>
                                    <small>Name</small>
                                </div>   
                                 <div id="Input-text">
                                    <input type="text" className="textInputContact" required="required"/>
                                    <small>E-mail</small>
                                </div>   
                                <div id="Textarea">
                                    <textarea required="required"></textarea>
                                    <small>Message</small>
                                </div>
                              
                            </span>
                        </div>
                        <div id="Buttons">
                            <button>SEND</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
    </>
  );
};

export default Contact;
