import linkedIcon from "@/assets/linkedin.png";
import instagramIcon from "@/assets/instagram.png";
import youtubeIcon from "@/assets/youtube.png";
import gmailIcon from "@/assets/gmail.png";
import ContactImage from "@/assets/contact.png";
import "./scss/contact.scss";

function Contact() {
    return (
        <div className="contact">
            <div className="socialMedia">
                <h2 className="contact-title">contact<span>.</span></h2>
                <p className="contact-description">
                    Get in touch with me via social media <br /> or send me an email.
                </p>
                <div className="contact-icons">
                    <a href="https://www.linkedin.com/in/g-adarsh-sonu/" target="_blank">
                        <img src={linkedIcon} alt="LinkedIn" />
                    </a>
                    <a href="https://instagram.com/g_adarsh_sonu" target="_blank">
                        <img src={instagramIcon} alt="Instagram" />
                    </a>
                    <a href="mailto:g.adarsh043@gmail.com">
                        <img src={gmailIcon} alt="Gmail" />
                    </a>
                    <a href="https://youtube.com/@g_adarsh_sonu" target="_blank">
                        <img src={youtubeIcon} alt="YouTube" />
                    </a>
                </div>
            </div>
            <div className="contact-image-container">
                <img src={ContactImage} alt="Contact" className="contact-image" />
            </div>
        </div>
    );
}

export default Contact;
