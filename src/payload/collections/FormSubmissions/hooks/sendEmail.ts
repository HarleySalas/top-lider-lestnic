import { replaceDoubleCurlys } from "../../../utilities/replaceDoubleCurlys";

export const sendEmail = async (beforeChangeData: any): Promise<any> => {
  const { operation, data } = beforeChangeData;

  if (operation === "create") {
    const {
      data: { id: formSubmissionId },
      req: { payload },
    } = beforeChangeData;

    const { form: formId, submissionData } = data || {};

    try {
      const form = await payload.findById({
        id: formId,
        collection: "custom-forms",
      });

      const { emails } = form;

      if (emails && emails.length) {
        const formattedEmails = emails.map((email) => {
          const {
            message,
            subject,
            emailTo,
            cc: emailCC,
            bcc: emailBCC,
            emailFrom,
            replyTo: emailReplyTo,
          } = email;

          const to = replaceDoubleCurlys(emailTo, submissionData);
          const cc = emailCC
            ? replaceDoubleCurlys(emailCC, submissionData)
            : "";
          const bcc = emailBCC
            ? replaceDoubleCurlys(emailBCC, submissionData)
            : "";
          const from = replaceDoubleCurlys(emailFrom, submissionData);
          const replyTo = replaceDoubleCurlys(
            emailReplyTo || emailFrom,
            submissionData
          );

          return {
            to,
            from,
            cc,
            bcc,
            replyTo,
            subject: replaceDoubleCurlys(subject, submissionData),
            html: `<div>SERIALIZE THE HTML HERE</div>`,
          };
        });

        let emailsToSend = formattedEmails;

        await Promise.all(
          emailsToSend.map(async (email) => {
            const { to } = email;
            try {
              const emailPromise = await payload.sendEmail(email);
              return emailPromise;
            } catch (err: unknown) {
              payload.logger.error({
                err: `Error while sending email to address: ${to}. Email not sent: ${err}`,
              });
            }
          })
        );
      } else {
        payload.logger.info({ msg: "No emails to send." });
      }
    } catch (err: unknown) {
      const msg = `Error while sending one or more emails in form submission id: ${formSubmissionId}.`;
      payload.logger.error({ err: msg });
    }
  }

  return data;
};
