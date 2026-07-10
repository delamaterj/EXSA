export default function ContactMD() {

    return (
        <>
            <article className="contact-card">
                <picture className="contact-image">
                    <img src="/exsa-mia2.jpeg" alt="Profile picture (Mia Delamater)" />
                </picture>
                <div className="contact-info">
                    <section className="contact-details">
                        <h4>mugedelamater0@gmail.com</h4>
                        <h4>(850) 910-0118</h4>
                    </section>
                    <section className="contact-socials">
                        <a href="https://www.instagram.com/mgsdl?igsh=MWdscGU1aWFjcDN3ZA==" target="_blank">
                            <img src="/instagram-logo.png" alt="Instagram Logo" />
                        </a>
                        <a href="https://www.facebook.com/share/1HYu5NL9cF/" target="_blank">
                            <img src="/facebook-logo.png" alt="Facebook Logo" />
                        </a>
                    </section>
                    <a href="/md.vcf" download>
                        <div className="contact-download">
                            Download Contact
                            <img src="/download.png" alt="Download Button" />
                        </div>
                    </a>
                </div>
            </article>
        </>
    );

}