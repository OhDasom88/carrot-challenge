"use server"

export async function handleSubmit(prevState: any, formData: FormData) {

    let errors = new Map<string, string[]>();
    const email = formData.get("email");
    if (!email) {
        errors.set("email", ["email is required"]);
    }
    const username = formData.get("username");
    if (!username ) {
        errors.set("username", ["username is required"]);
    }
    const password = formData.get("password");
    // console.log(email, username, password);
    if (!password || password !== "12345") {
        errors.set("password", ["wrong password"]);
    }
    return {errors: errors, formData: formData}

}