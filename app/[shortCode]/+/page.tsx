import styles from './page.module.scss'

export default function page({params} : {params: { shortCode: string }}) {
    return (
        <h1>{params.shortCode}</h1>
    );
}