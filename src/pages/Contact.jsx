import { useEffect } from "react";
import linkedIcon from "@/assets/linkedin.png";
import instagramIcon from "@/assets/instagram.png";
import youtubeIcon from "@/assets/youtube.png";
import gmailIcon from "@/assets/gmail.png";
import ContactImage from "@/assets/contact.png";
import "./scss/contact.scss";
import PropTypes from 'prop-types';
import { trackPageView, trackButtonClick, trackUserInteraction } from '@/utils/analytics';

function Contact({ isMobile }) {
    useEffect(() => {
        // Track page view
        trackPageView('/contact', 'Contact - Adarsh Gella Portfolio');
    }, []);

    const handleSocialClick = (platform, url) => {
        trackButtonClick(`${platform} Link`, 'contact_page', {
            platform: platform.toLowerCase(),
            url: url,
            device_type: isMobile ? 'mobile' : 'desktop'
        });
        trackUserInteraction('social_media_click', platform, { url });
    };

    return (
        <div className={`contact ${isMobile ? 'contactMweb' : ''}`}>
            <div className="socialMedia">
                <h2 className="contact-title">contact<span>.</span></h2>
                <p className="contact-description">
                    Get in touch with me via social media <br /> or send me an email.
                </p>
                <div className="contact-icons">
                    <a 
                        href="https://www.linkedin.com/in/g-adarsh-sonu/" 
                        target="_blank"
                        onClick={() => handleSocialClick('LinkedIn', 'https://www.linkedin.com/in/g-adarsh-sonu/')}
                    >
                        <img src={linkedIcon} alt="LinkedIn" />
                    </a>
                    <a 
                        href="https://instagram.com/g_adarsh_sonu" 
                        target="_blank"
                        onClick={() => handleSocialClick('Instagram', 'https://instagram.com/g_adarsh_sonu')}
                    >
                        <img src={instagramIcon} alt="Instagram" />
                    </a>
                    <a 
                        href="mailto:g.adarsh043@gmail.com"
                        onClick={() => handleSocialClick('Gmail', 'mailto:g.adarsh043@gmail.com')}
                    >
                        <img src={gmailIcon} alt="Gmail" />
                    </a>
                    <a 
                        href="https://youtube.com/@g_adarsh_sonu" 
                        target="_blank"
                        onClick={() => handleSocialClick('YouTube', 'https://youtube.com/@g_adarsh_sonu')}
                    >
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

Contact.propTypes = {
    isMobile: PropTypes.bool
};

export default Contact;
