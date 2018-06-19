// using code from https://medium.freecodecamp.org/sending-emails-with-amazon-ses-7617e83327b6

const AWS = require('aws-sdk');

const emailTemplate = require('./emailTemplate');

function createInquiryParamsConfig(email, name, credentialProviderName, inviteLink) {
    return {
        Destination: {
            BccAddresses: [],
            CcAddresses: [],
            ToAddresses: [email]
        },
        Message: {
            Body: {
                Html: {
                    Data: emailTemplate.createInviteEmail(name, credentialProviderName, inviteLink),
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'CVVerity invite for ' + email,
                Charset: 'UTF-8'
            }
        },
        Source: 'kvelakur@finovertech.com',
        ReplyToAddresses: ['kvelakur@finovertech.com'],
        ReturnPath: 'kvelakur@finovertech.com'
    };
}

function sendAWSEmail(email, name, credentialProviderName, inviteLink) {
    const ses = new AWS.SES({
        region: 'eu-west-1'
    });

    return new Promise((resolve, reject)=>{
        if(!email || !name || !credentialProviderName || !inviteLink){
            reject('Missing user email or name')
        } else {
            const params = createInquiryParamsConfig(email, name, credentialProviderName, inviteLink);
            // console.log('Sending email with attached params!')
            AWS.config.credentials.refresh(function(){
                // console.log(AWS.config.credentials)
                ses.sendEmail(params, function(err, data) {
                    if(err){
                        // console.log(err, err.stack); // an error occurred
                        reject(err)
                    } else{
                        // console.log(data);           // successful response
                        resolve('Success! Email sent')
                    }
                })
            })
        }
    });
}

module.exports = { sendAWSEmail };
