import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '/database/db';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;

                // Check the patients table first
                let user = await db.get('SELECT * FROM patients WHERE email = ?', [email]);
                let role = 'patient';

                // If not found in patients, check the doctors table
                if (!user) {
                    user = await db.get('SELECT * FROM doctors WHERE email = ?', [email]);
                    role = 'doctor';
                }

                // Check if user exists and password matches
                if (user && password === user.password) {
                    return { ...user, role }; // Include the role in the user object
                } else {
                    return null; // Return null if authentication fails
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role; // Add the role to the JWT token
            }
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role; // Add the role to the session
            return session;
        },
    },
    pages: {
        signIn: '/signin', // Custom sign-in page
    },
    secret: process.env.NEXTAUTH_SECRET, // Add a secret for encryption
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };