import { renderTemplate, transporter } from '../middlewares/nodemailer.js';



const newPassword = (user)=> {
   return new Promise((resolve, reject)=>{
    let htmlString = renderTemplate({...user});

    transporter.sendMail({
       from: 'cnauthtests@gmaill',
       to: user.email,
       subject: "New Password!",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            reject(err);
            return;
        }
        
        resolve(info);
        return;
    });
   })
}

export default newPassword 