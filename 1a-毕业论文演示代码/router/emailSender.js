// emailSender.js
const nodemailer = require("nodemailer");

// 创建传输器
const transporter = nodemailer.createTransport({
  host: "smtp.qq.com", // QQ 邮箱的 SMTP 服务器
  port: 465, // QQ 邮箱的 SMTP 端口
  secure: true, // 使用 SSL
  auth: {
    user: "1925792024@qq.com", // 你的 QQ 邮箱地址
    pass: "fhsmfcnhtfdshigf", // 你的 QQ 邮箱的授权码（不是邮箱密码）
  },
});

/**
 * 发送邮件
 * @param {string} recipients - 收件人地址，多个地址用逗号分隔
 * @param {string} subject - 邮件主题
 * @param {string} text - 邮件内容（纯文本）
 * @param {string} html - 邮件内容（HTML）
 * @returns {Promise} - 返回一个 Promise，表示发送邮件的结果
 */
const sendEmail = (option) => {
  const mailOptions = {
    from: "1925792024@qq.com", // 发件人地址
    ...option,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return reject({
          success: false,
          message: error,
        });
      } else {
        return resolve({
          success: true,
        });
      }
    });
  });
};

module.exports = sendEmail;
