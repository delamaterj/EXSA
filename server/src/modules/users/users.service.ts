import bcrypt from "bcrypt";
import pool from "../../config/db";
import jwt from "jsonwebtoken";


//Create new user (name, email, phone, password)
export async function userSignupService(
name: string,
email: string, 
phone: string, 
password: string) {

    const client = await pool.connect();

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (name, email, phone, password_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, phone, role`,
            [name, email, phone, hashedPassword]
        );

        return result.rows[0];

    }
    catch(err) {
        throw Error("Could not signup user");
    }
    finally {
        client.release();
    }
}

//JWT - Authenticate user
export async function loginUserService(email: string,
password: string) {

    const client = await pool.connect();

    try {

        const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    const user = result.rows[0];

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            role: user.role
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
    );

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
    };

    }
    catch(err){
        throw Error("Could not login user");
    }
    finally {
        client.release();
    }
}