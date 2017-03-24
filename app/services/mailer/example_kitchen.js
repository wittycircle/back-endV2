function kitchenSink() {
    var helper = require('sendgrid').mail

    mail = new helper.Mail()
    email = new helper.Email("test@example.com", "Example User")
    mail.setFrom(email)

    mail.setSubject("Hello World from the SendGrid Node.js Library")

    personalization = new helper.Personalization()
    email = new helper.Email("test1@example.com", "Example User")
    personalization.addTo(email)
    email = new helper.Email("test2@example.com", "Example User")
    personalization.addTo(email)
    email = new helper.Email("test3@example.com", "Example User")
    personalization.addCc(email)
    email = new helper.Email("test4@example.com", "Example User")
    personalization.addBcc(email)

    personalization.setSubject("Hello World from the Personalized SendGrid Node.js Library")
    substitution = new helper.Substitution("%name%", "Example User")
    personalization.addSubstitution(substitution)
    substitution = new helper.Substitution("%city%", "Denver")
    personalization.addSubstitution(substitution)
    content = new helper.Content("text/plain", "some text here")
    mail.addContent(content)
    content = new helper.Content("text/html", "<html><body>some text here</body></html>")
    mail.addContent(content)
    content = new helper.Content("text/calendar", "Party Time")
    mail.addContent(content)

    mail.setTemplateId("439b6d66-4408-4ead-83de-5c83c2ee313a")
    email = new helper.Email("test@example.com", "Example User")
    mail.setSendAt(1443636899)
    mail.setReplyTo(email)

    return mail.toJSON()
}


// header = new helper.Header("X-Test", "True")
// personalization.addHeader(header)
// header = new helper.Header("X-Test2", "False")
// personalization.addHeader(header)


// custom_arg = new helper.CustomArgs("timing", "morning")
// personalization.addCustomArg(custom_arg)
// custom_arg = new helper.CustomArgs("type", "marketing")
// personalization.addCustomArg(custom_arg)
// personalization.setSendAt(1443636899)
// mail.addPersonalization(personalization)


// attachment = new helper.Attachment()
// attachment.setContent("TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gQ3JhcyBwdW12")
// attachment.setType("application/pdf")
// attachment.setFilename("balance_001.pdf")
// attachment.setDisposition("attachment")
// mail.addAttachment(attachment)

// attachment = new helper.Attachment()
// attachment.setContent("BwdW")
// attachment.setType("image/png")
// attachment.setFilename("banner.png")
// attachment.setDisposition("inline")
// attachment.setContentId("banner")
// mail.addAttachment(attachment)


// section = new helper.Section("%section1%", "Textforasubstitutiontagofsection1")
// mail.addSection(section)
// section = new helper.Section("%section2%", "Textforasubstitutiontagofsection2")
// mail.addSection(section)

// header = new helper.Header("X-Test3", "1")
// mail.addHeader(header)
// header = new helper.Header("X-Test4", "2")
// mail.addHeader(header)

// category = new helper.Category("January")
// mail.addCategory(category)
// category = new helper.Category("2015")
// mail.addCategory(category)

// custom_arg = new helper.CustomArgs("timing", "evening")
// mail.addCustomArg(custom_arg)
// custom_arg = new helper.CustomArgs("type", "summer_contest")
// mail.addCustomArg(custom_arg)


//This must be a valid [batch ID](https://sendgrid.com/docs/API_Reference/SMTP_API/scheduling_parameters.html) to work
//mail.setBatchId("some_batch_id")

// asm = new helper.Asm(3, [1,4,5])
// mail.setAsm(asm)

// mail.setIpPoolName("23")

// mail_settings = new helper.MailSettings()
// bcc = new helper.Bcc(true, "test@example.com")
// mail_settings.setBcc(bcc)
// bypass_list_management = new helper.BypassListManagement(false)
// mail_settings.setBypassListManagment(bypass_list_management)
// footer = new helper.Footer(true, "some footer text", "<html><body>some footer text</body></html>")
// mail_settings.setFooter(footer)
// sandbox_mode = new helper.SandBoxMode(true)
// mail_settings.setSandBoxMode(sandbox_mode)
// spam_check = new helper.SpamCheck(true, 1, "https://gotchya.example.com")
// mail_settings.setSpamCheck(spam_check)
// mail.addMailSettings(mail_settings)

// tracking_settings = new helper.TrackingSettings()
// click_tracking = new helper.ClickTracking(false, false)
// tracking_settings.setClickTracking(click_tracking)
// open_tracking = new helper.OpenTracking(true, "Optional tag to replace with the open image in the body of the message")
// tracking_settings.setOpenTracking(open_tracking)
// subscription_tracking = new helper.SubscriptionTracking(true, "text to insert into the text/plain portion of the message", "html to insert into the text/html portion of the message", "Optional tag to replace with the open image in the body of the message")
// tracking_settings.setSubscriptionTracking(subscription_tracking)
// ganalytics = new helper.Ganalytics(true, "some utm source", "some utc medium", "some utm term", "some utm content", "some utm campaign")
// tracking_settings.setGanalytics(ganalytics)
// mail.addTrackingSettings(tracking_settings)

