import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: "mamoojim@hotmail.com",
      subject: "Thanks for joining in!",
      text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    })
    .then(() => {
      console.log("email sent succesfully");
    })
    .catch((error) => {
      console.error(error.response.body);
    });
};

const sendCancelationEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: "mamoojim@hotmail.com",
      subject: `Good bye ${name}!`,
      text: `Sorry to see you go ${name}. Please let us know why you cancelled, and any improvements we can implement for a better experience.`,
    })
    .then(() => {
      console.log("email sent succesfully");
    })
    .catch((error) => {
      console.error(error.response.body);
    });
};

export { sendWelcomeEmail, sendCancelationEmail };
