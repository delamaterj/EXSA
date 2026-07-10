export default function Footer() {
    return (
        <>
            <footer>
                <label>© 2026 Emerald Excellence Sports Academy (EXSA). All rights reserved.</label>
                <br />
                <label>(850) 895-7735 | exsa850@gmail.com</label>

                <div className="social-links">
                    <a href="https://www.facebook.com/share/1HiNHGPc6t/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook">
                        <img src="/facebook-logo.png" alt="Facebook" className="social-icon" />
                    </a>
                    <a href="https://www.instagram.com/exsa.850"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram">
                        <img src="/instagram-logo.png" alt="Instagram" className="social-icon" />
                    </a>
                </div>
            </footer>
        </>
    );
}