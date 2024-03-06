import nodemailer from 'nodemailer'

const emailRegister = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const {email, name, token} = data

    // Enviar el email
    await transport.sendMail({
        from: 'Bienes Raices',
        to: email,
        subject: 'Confirma tu cuenta en Bienes Raices',
        text:'Confirma tu cuenta en Bienes Raices',
        html: `
            <p>Hola, ${name}, comprueba tu cuenta en Bienes Raices</p>

            <p>Solo debes confirmar dando click en el siguiente enlace: <a href='${process.env.URL_BACKEND}:${process.env.PORT}/auth/confirmar/${token}'>Confirmar cuenta</a></p>

            <p>Si tu no creaste esta cuenta, has caso omiso al mensaje.</p>
        `
    })
}

export {
    emailRegister
}