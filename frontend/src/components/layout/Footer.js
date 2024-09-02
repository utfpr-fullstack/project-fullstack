import styles from './Footer.module.css';
function Footer() {
    return(
     <footer className={styles.footer}>
         <p>
             <span className="bold">Movie API</span> &copy; 2024
         </p>
     </footer>
    );
}

export default Footer;