import { Injectable, Logger } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class SmsService {
  private client: Twilio.Twilio | null = null;
  private fromNumber: string;
  private readonly logger = new Logger(SmsService.name);

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER || '';

    if (accountSid && authToken && this.fromNumber) {
      this.client = Twilio.default(accountSid, authToken);
      this.logger.log('Twilio SMS configuré');
    } else {
      this.logger.warn('Twilio non configuré - les SMS seront affichés dans la console');
    }
  }

  async sendSms(to: string, message: string): Promise<boolean> {
    // Nettoyer le numéro
    let phone = to.replace(/\s+/g, '');
    if (!phone.startsWith('+')) {
      phone = '+221' + phone.replace(/^0/, '');
    }

    if (this.client) {
      try {
        await this.client.messages.create({
          body: message,
          from: this.fromNumber,
          to: phone,
        });
        this.logger.log(`SMS envoyé à ${phone}`);
        return true;
      } catch (error) {
        this.logger.error(`Erreur envoi SMS à ${phone}:`, error);
        return false;
      }
    } else {
      // Mode développement : afficher dans la console
      this.logger.log(`[SMS SIMULÉ] À: ${phone}`);
      this.logger.log(`[SMS SIMULÉ] Message: ${message}`);
      return true;
    }
  }

  async sendOrderConfirmed(phone: string, orderRef: string, total: number): Promise<boolean> {
    const message =
      `MinaaFragrance - Votre commande #${orderRef} est confirmée!\n\n` +
      `Montant: ${total.toLocaleString('fr-FR')} FCFA\n\n` +
      `Veuillez effectuer le paiement pour que nous puissions procéder à la livraison.\n\n` +
      `Merci pour votre confiance!`;

    return this.sendSms(phone, message);
  }

  async sendOrderShipped(phone: string, orderRef: string): Promise<boolean> {
    const message =
      `MinaaFragrance - Votre commande #${orderRef} est en cours de livraison!\n\n` +
      `Vous serez contacté(e) à la réception.\n\n` +
      `Merci pour votre confiance!`;

    return this.sendSms(phone, message);
  }

  async sendOrderDelivered(phone: string, orderRef: string): Promise<boolean> {
    const message =
      `MinaaFragrance - Votre commande #${orderRef} a été livrée!\n\n` +
      `Merci pour votre achat et à bientôt!`;

    return this.sendSms(phone, message);
  }
}
