const Mailgen = require("mailgen");

class EmailService {
  constructor(sender) {
    this.sender = sender;
    this.link = "https://42fd-188-239-118-227.eu.ngrok.io";
    this.mailgen = new Mailgen({
      theme: "default",
      product: {
        name: "delivery",
        link: this.link,
      },
    });
  }

  createEmailTemplate(username, token) {
    const email = {
      body: {
        name: username,
        intro: "Welcome to delivery We're very excited to have you on board.",
        action: {
          instructions: "To get started with delivery, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/api/auth/verify-email/${token}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    return this.mailgen.generate(email);
  }

  async sendEmail(email, username, token) {
    const emailTemplate = this.createEmailTemplate(username, token);
    const message = {
      to: email,
      subject: "Welcome to delivery",
      html: emailTemplate,
    };

    const result = await this.sender.send(message);
    return result;
  }
}

module.exports = EmailService;
