import { createTransport } from "nodemailer";


export const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'cnauthtests@gmail.com',
        pass: process.env.GOOGLE_PASSWORD || "jkijnseykhacsfvm"
    }
});


export const  renderTemplate = (data) => {
    
    let mailHTML = `
        
Hi ${data.name},
</br>
</br>

There was a request to change your password!
</br>
If you did not make this request then please ignore this email.
</br>
Otherwise, please click this link to change your password: <a href="${data.link}">Link</a>
    `;
    

    return mailHTML;
}