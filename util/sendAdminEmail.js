const sendEmail = require("./sendEmail");

module.exports = async (err) => {
  await sendEmail(
    process.env.ADMIN_EMAIL,
    `${err.name} - ${Date.now}`,
    `<h1>Error (${err.name}) - ${Date.now()}</h1><br/><p>${err.stack}</p>`
  );
};
