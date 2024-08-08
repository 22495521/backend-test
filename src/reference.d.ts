declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;

            MYSQL_HOST: string;
            MYSQL_USER: string;
            MYSQL_PASSWORD: string;
            MYSQL_DATABASE: string;

            NODE_ENV: 'development' | 'production';
        }
    }
}
