import bcrypt from "bcrypt";
import pool from "../../config/db";
import jwt from "jsonwebtoken";

interface Credential {
    type : string,
    value : string
}


//Create new user (name, email, phone, password)
export async function userSignupService(
name: string,
email: string, 
phone: string, 
password: string) {

    const client = await pool.connect();

    try {

        const dupeEmail = await client.query(
            `SELECT id FROM users
            WHERE email = $1`,
            [email]
        );

        const dupePhone = await client.query(
            `SELECT id FROM users
            WHERE phone = $1`,
            [phone]
        );

        if (dupeEmail.rows.length > 0 || dupePhone.rows.length > 0) {
            throw Error("Email or phone is taken");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await client.query(
            `INSERT INTO users (name, email, phone, password_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, phone, role`,
            [name, email, phone, hashedPassword]
        );

        return result.rows[0];

    }
    catch(err) {
        throw Error("Could not signup user. Please try again later");
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
        const result = await client.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

    const user = result.rows[0];

    if (!user) {
        throw new Error("Incorrect email and/or password");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!isMatch) {
        throw new Error("Incorrect email and/or password");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        }
    };

    }
    catch(err){
        throw Error("Could not login user. Please try again later");
    }
    finally {
        client.release();
    }
}

export async function updateUserService(userId: string, credential : Credential) {

    const client = await pool.connect();

    try {
        if (credential.type === 'name') {
            const updateName = await client.query(
                `UPDATE users
                SET name = $1
                WHERE id = $2
                RETURNING name`,
                [credential.value, userId]
            );
            return updateName.rows[0];
        }
        else if (credential.type === 'email') {
            const dupeEmail = await client.query(
                `SELECT email FROM users
                WHERE email = $1
                AND id <> $2`,
                [credential.value, userId]
            );
            if (dupeEmail.rows.length > 0) {
                throw Error("Email already taken");
            }
            const updateEmail = await client.query(
                `UPDATE users
                SET email = $1
                WHERE id = $2
                RETURNING email`,
                [credential.value, userId]
            );
            return updateEmail.rows[0];
        }
        else if (credential.type === 'phone') {
             const dupePhone = await client.query(
                `SELECT phone FROM users
                WHERE phone = $1
                AND id <> $2`,
                [credential.value, userId]
            );
            if (dupePhone.rows.length > 0) {
                throw Error("Email already taken");
            }
            const updatePhone = await client.query(
                `UPDATE users
                SET phone = $1
                WHERE id = $2
                RETURNING email`,
                [credential.value, userId]
            );
            return updatePhone.rows[0];
        }
        else {
            throw Error("Invalid credential type");
        }
    }
    catch (err) {
        throw Error("Could not update user credentials. Please Try again later");
    }
    finally {
        client.release();
    }
}

export async function deleteUserService(userId: string) {

    const client = await pool.connect();

    try {

        const userExists = await client.query(
            `SELECT id FROM users
            WHERE id = $1`,
            [userId]
        );

        if (userExists.rows.length === 0) {
            throw Error("User does not exist");
        }

        await client.query(
            `DELETE FROM users
            WHERE id = $1`,
            [userId]
        );
        return {message: "Account has been successfully removed."}
    }
    catch (err) {
        throw Error("Could not delete account. Please Try again later");
    }
    finally {
        client.release();
    }

}