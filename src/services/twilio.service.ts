import twilio, { Twilio } from 'twilio';

class TwilioClient {
   client: Twilio | null = null;

   initTwilio = () => {
      this.client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
   };

   getClient() {
      return this.client;
   }
}

const twilioClient = new TwilioClient();

export default twilioClient;
