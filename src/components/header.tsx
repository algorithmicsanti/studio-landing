
import Image from 'next/image'
import Link from 'next/link'
import styles from './header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logoLink}>
                <Image
                    src="/adnovalogo.svg"
                    alt="Adnova Studio Logo"
                    width={320}
                    height={320}
                    className={styles.logoImage}
                    priority
                />
            </Link>
        </header>
    )
}
